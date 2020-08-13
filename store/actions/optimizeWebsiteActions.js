import axios from "axios";
import * as actionTypes from "./actionTypes";
import createBaseUrl from "./createBaseUrl";
import analytics from "@segment/analytics-react-native";
import NavigationService from "../../NavigationService";
import { showMessage } from "react-native-flash-message";

export const verifyInstagramHandleWebsite = (insta_handle) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.SET_INSTAGRAM_POST_LOADING,
        payload: false,
      });
      var response = await axios.get(
        `https://www.instagram.com/${insta_handle}`
      );
      if (response) {
        var data = response.data;
        data = data.split("window._sharedData = ");
        data = data[1].split("</script>");
        data = data[0];
        data = data.substr(0, data.length - 1);
        data = JSON.parse(data);
        data = data.entry_data.ProfilePage[0].graphql.user;
        if (data.is_private) {
          return dispatch({
            type: actionTypes.ERROR_GET_INSTAGRAM_POSTS,
            payload: {
              error: true,
              errorMessage: `${insta_handle} is a private account Try with some other account`,
            },
          });
        } else {
          return dispatch({
            type: actionTypes.ERROR_GET_INSTAGRAM_POSTS,
            payload: {
              error: false,
              errorMessage: null,
            },
          });
        }
      }
    } catch (err) {
      // console.log('insta error verify account', err.response || err.message);
      return dispatch({
        type: actionTypes.ERROR_GET_INSTAGRAM_POSTS,
        payload: {
          error: true,
          errorMessage: `${insta_handle} doesn't exist Try another account name`,
        },
      });
    }
  };
};
export const getInstagramPostInitialWebsite = (insta_handle) => {
  // console.log("insta_handle", insta_handle);

  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.GET_INSTAGRAM_POST_LOADING,
        payload: true,
      });
      // console.log('getInstagramPost insta_handle', insta_handle);
      var response = await axios.get(
        `https://www.instagram.com/${insta_handle}`
      );
      if (response && response.data) {
        var data = response.data;
        data = data.split("window._sharedData = ");
        data = data[1].split("</script>");
        data = data[0];
        data = data.substr(0, data.length - 1);
        data = JSON.parse(data);

        data = data.entry_data.ProfilePage[0].graphql.user;
        // console.log('data', data);
        var businessLogo = data.profile_pic_url;
        const mediaArray = [];

        const mediaList = data.edge_owner_to_timeline_media;
        // console.log("mediaList", mediaList);
        mediaArray.push(...mediaList.edges);
        let hasNextPage = mediaList.page_info.has_next_page;
        let end_cursor = mediaList.page_info.end_cursor;
        // console.log("mediaArrayLength", mediaArray.length);

        if (mediaArray && mediaArray.length > 0) {
          var imagesList = mediaArray.map((media) => {
            // console.log("media", JSON.stringify(media, null, 2));
            // if (!media.node.is_video)
            return {
              imageUrl: media.node.display_url,
              shortcode: media.node.shortcode,
              imageId: media.node.id,
              productDescription:
                media.node.edge_media_to_caption.edges.length > 0
                  ? media.node.edge_media_to_caption.edges[0].node.text
                  : "",
              isVideo: media.node.is_video,
            };
          });

          // imagesList = imagesList.filter(item => {
          //   return !item.isVideo;
          // });
          // console.log("imagesList", imagesList.length);

          return dispatch({
            type: actionTypes.GET_INSTAGRAM_POST,
            payload: {
              businessLogo: businessLogo,
              imagesList: imagesList,
              instaHandleId: data.id,
              instaHasNextPage: hasNextPage,
              instaEndCursor: end_cursor,
            },
          });
          // console.log('imageListAfterSize', imagesList.length);
        }

        return dispatch({
          type: actionTypes.GET_INSTAGRAM_POST,
          payload: {
            businessLogo: "",
            imagesList: [],
            instaHandleId: null,
            instaHasNextPage: null,
            instaEndCursor: null,
          },
        });
      }
    } catch (error) {
      // console.log(
      //   "getInstagramPostInitialWebsite error",
      //   error.response || error.message
      // );
      return dispatch({
        type: actionTypes.ERROR_GET_INSTAGRAM_POSTS,
        payload: {
          error: true,
          errorMessage: null,
        },
      });
    }
  };
};

export const loadMoreInstagramPostWebsite = (instaHandleId, instaEndCursor) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.LOADING_MORE_INSTAGRAM_POSTS,
        payload: true,
      });
      const responseMedia = await axios.get(
        `https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${instaHandleId}","first":12,"after":"${instaEndCursor}"}`
      );
      // console.log("responseMediA", responseMedia.data);

      let mediaArray = [
        ...responseMedia.data.data.user.edge_owner_to_timeline_media.edges,
      ];

      let hasNextPage =
        responseMedia.data.data.user.edge_owner_to_timeline_media.page_info
          .has_next_page;
      let end_cursor =
        responseMedia.data.data.user.edge_owner_to_timeline_media.page_info
          .end_cursor;
      analytics.track(`a_load_more_posts`, {
        source: "my_website_products",
        source_action: "a_load_more_posts",
        action_status:
          mediaArray && mediaArray.length > 0 ? "success" : "failure",
      });
      if (mediaArray && mediaArray.length > 0) {
        var imagesList = mediaArray.map((media) => {
          return {
            imageUrl: media.node.display_url,
            shortcode: media.node.shortcode,
            imageId: media.node.id,
            productDescription:
              media.node.edge_media_to_caption.edges.length > 0
                ? media.node.edge_media_to_caption.edges[0].node.text
                : "",
            isVideo: media.node.is_video,
          };
        });

        // imagesList = imagesList.filter(item => {
        //   return !item.isVideo;
        // });
        return dispatch({
          type: actionTypes.GET_MORE_INSTAGRAM_POSTS,
          payload: {
            imagesList: imagesList,
            instaHasNextPage: hasNextPage,
            instaEndCursor: end_cursor,
          },
        });
      }
    } catch (error) {
      // console.log("ERROR LOADING MORE", error.message || error.response);

      return dispatch({
        type: actionTypes.ERROR_GET_MORE_INSTAGRAM_POSTS,
        payload: {
          imagesList: [],
          instaHasNextPage: null,
          instaEndCursor: null,
        },
      });
    }
    // console.log('imageListAfterSize', imagesList.length);
  };
};

/**
 *
 * @param {*} edit to update products list
 * @param {*} webproductsToHide array of imageIds to hide
 * @param {*} businessid businessid
 * @param {*} businesslogo  instgarm business logo
 * @param {*} no_of_products_to_show number of products to show by default 60
 */
export const saveWebProductsToHide = (
  edit = false,
  webproductsToHide,
  businessid,
  businesslogo,
  no_of_products_to_show = 60
) => {
  return (dispatch, getState) => {
    const { insta_handle } = getState().account.mainBusiness;
    const products_to_hide_id = getState().website.products_to_hide_id;
    // console.log("insta_handle", insta_handle);
    // console.log("products_to_hide_id", products_to_hide_id);

    if (edit && products_to_hide_id) {
      createBaseUrl()
        .put(`businesswebProducts`, {
          webproducts: webproductsToHide,
          businessid,
          businesslogo,
          no_of_products_to_show,
          insta_handle,
          id: products_to_hide_id,
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          analytics.track(`a_submit_my_website_products`, {
            source: "open_my_website",
            source_action: "a_submit_my_website_products",
            new: false,
            action_status: data.success ? "success" : "failure",
            error_description: !data.success && data.message,
            webproductsToHide,
            businesslogo,
            products_to_hide_id,
            insta_handle,
          });
          showMessage({
            type: data.success ? "success" : "warning",
            message: data.message,
          });
          if (data.success) {
            dispatch({
              type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
              payload: { weburl: data.weburl },
            });
          }

          return data;
        })
        .then((data) => {
          data.success &&
            NavigationService.navigate("MyWebsite", {
              source: "open_my_website",
              source_action: "a_submit_my_website_products",
            });
        })
        .catch((error) => {
          // console.log("saveWebProductsToHide", error.response || error.message);
        });
    } else {
      createBaseUrl()
        .post(`businesswebProducts`, {
          webproducts: webproductsToHide,
          businessid,
          businesslogo,
          no_of_products_to_show,
          insta_handle,
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          analytics.track(`a_submit_my_website_products`, {
            source: "my_website_products",
            source_action: "a_submit_my_website_products",
            new: true,
            action_status: data.success ? "success" : "failure",
            error_description: !data.success && data.message,
            webproductsToHide,
            businesslogo,
            insta_handle,
            weburl: data.weburl,
          });

          if (data.success) {
            dispatch({
              type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
              payload: { weburl: data.weburl, businesslogo: businesslogo },
            });
          }

          return data;
        })
        .then((data) => {
          // console.log("businesswebProducts data", data);

          if (data.success) {
            NavigationService.navigate("WebsiteRegistartionSuccess", {
              source: "my_website_products",
              source_action: "a_submit_my_website_products",
            });
          }
        })
        .catch((error) => {
          // console.log("saveWebProductsToHide", error.response || error.message);
        });
    }
  };
};

/**
 *
 * @param {*} businessid
 * To get the list of webproducts that are not be shown on client website
 */
export const getWebProductsToHide = (businessid) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_HIDDEN_INSTAGRAM_POST,
      payload: {
        products_to_hide_id: null,
        products_to_hide_list: [],
      },
    });
    createBaseUrl()
      .get(`businesswebProducts/${businessid}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log("getWebProductsToHide data", data);
        if (data.success) {
          var webProducts = JSON.parse(data.productsinfo.webproducts);
          return dispatch({
            type: actionTypes.SET_HIDDEN_INSTAGRAM_POST,
            payload: {
              products_to_hide_id: data.productsinfo.id,
              products_to_hide_list:
                webProducts && webProducts.length > 0 ? webProducts : [],
            },
          });
        }
        return dispatch({
          type: actionTypes.SET_HIDDEN_INSTAGRAM_POST,
          payload: {
            products_to_hide_id: null,
            products_to_hide_list: [],
          },
        });
      })
      .catch((error) => {
        // console.log(
        //   "getWebProductsToHide error",
        //   error.response || error.message
        // );

        return dispatch({
          type: actionTypes.SET_HIDDEN_INSTAGRAM_POST,
          payload: {
            products_to_hide_id: null,
            products_to_hide_list: [],
          },
        });
      });
  };
};

/**
 *
 * @param {*} edit to update products list
 * @param {*} webproductsToHide list of products to be added
 */
export const saveWebProductsToAdd = (webproductsToAdd, businessid) => {
  return (dispatch) => {
    const info = {
      business_id: businessid,
      products: webproductsToAdd,
    };

    delete axios.defaults.headers.common["Authorization"];

    axios
      .post(`https://optimizeapp.com/ecommerce/api/products`, info, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        // console.log("data save", data);
        analytics.track(`a_submit_my_website_products`, {
          source: "open_select_product",
          source_action: "a_submit_my_website_products",
          action_status: data.data ? "success" : "failure",
          // error_description: !data.success && data.message,
          webproductsToAdd,
        });

        NavigationService.navigate("MyWebsite", {
          source: "open_select_product",
          source_action: "a_submit_my_website_products",
        });

        return dispatch({
          type: actionTypes.SET_WEB_PRODUCTS,
          payload: data.data,
        });
      })

      .catch((error) => {
        console.log(
          "saveWebProductsToAdd error",
          error.response || error.message
        );
      });
  };
};

export const getWebProductsList = (businessid) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_WEB_PRODUCTS_LOADING,
      payload: true,
    });

    axios
      .get(
        `https://optimizeapp.com/ecommerce/api/business/${businessid}/products`
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.SET_WEB_PRODUCTS_LIST,
          payload: data.data,
        });
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.SET_WEB_PRODUCTS_LIST,
          payload: [],
        });
      });
  };
};

export const deleteWebProduct = (product_id) => {
  return (dispatch) => {
    delete axios.defaults.headers.common["Authorization"];

    axios
      .delete(`https://optimizeapp.com/ecommerce/api/products/${product_id}`)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        analytics.track(`a_delete_product`, {
          source: "open_edit_product",
          source_action: "a_delete_product",
          action_status: data === 204 ? "success" : "failure",
          // error_description:  data.message,
        });
        if (data === 204) {
          NavigationService.navigate("MyWebsite", {
            source: "open_edit_product",
            source_action: "a_delete_product",
          });
          return dispatch({
            type: actionTypes.DELETE_WEB_PRODUCT,
            payload: product_id,
          });
        }
      })

      .catch((error) => {
        // console.log("deleteWebProduct error", error.response || error.message);
      });
  };
};

export const saveSingleWebProduct = (product_id, info) => {
  // console.log("product_id", product_id);
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_WEB_PRODUCT_LOADER,
      payload: true,
    });
    delete axios.defaults.headers.common["Authorization"];
    axios
      .patch(
        `https://optimizeapp.com/ecommerce/api/products/${product_id}`,
        info
      )
      .then((res) => res.data)
      .then((data) => {
        analytics.track(`a_save_product_detail`, {
          source: "open_edit_product",
          source_action: "a_save_product_detail",
          product_id,
          product: info,
          action_status: data.data ? "success" : "failure",
        });
        // console.log("data save product", data);
        NavigationService.navigate("MyWebsite", {
          source: "open_edit_product",
          source_action: "a_save_product_detail",
        });
        dispatch({
          type: actionTypes.SAVE_WEB_PRODUCT_LOADER,
          payload: false,
        });
        return dispatch({
          type: actionTypes.SAVE_SINGLE_WEB_PRODUCT,
          payload: data.data,
        });
      })
      .catch((err) => {
        // console.log("saveSingleWebProduct", err.response || err.message);

        return dispatch({
          type: actionTypes.SAVE_WEB_PRODUCT_LOADER,
          payload: false,
        });
      });
  };
};

export const saveSingleMedia = (
  media,
  loading,
  cancelUplaod,
  onToggleModal
) => {
  onToggleModal(true);

  // console.log("media save", media);
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_PRODUCT_MEDIA,
      payload: {},
    });

    delete axios.defaults.headers.common["Authorization"];
    axios
      .post(`https://optimizeapp.com/ecommerce/api/products/media`, media, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        onUploadProgress: (ProgressEvent) =>
          loading((ProgressEvent.loaded / ProgressEvent.total) * 100),
        cancelToken: cancelUplaod.token,
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log("data save media", data);
        analytics.track(`a_add_product_media`, {
          source: "open_edit_product",
          source_action: "a_add_product_media",
          media,
          action_status: data.data ? "success" : "failure",
        });
        onToggleModal(false);
        return dispatch({
          type: actionTypes.SAVE_PRODUCT_MEDIA,
          payload: data.data,
        });
      })
      .catch((err) => {
        loading(0);
        onToggleModal(false);
        analytics.track(`a_add_product_media`, {
          source: "open_edit_product",
          source_action: "a_add_product_media",
          media,
          action_status: "failure",
          error_description: err.response || err.message,
        });
        // console.log("saveSingleWebProduct error", err.response || err.message);
      });
  };
};

export const setSavingToInitial = () => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.SAVE_WEB_PRODUCT_LOADER,
      payload: false,
    });
  };
};
