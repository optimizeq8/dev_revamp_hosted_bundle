import * as actionTypes from "../actions/actionTypes";

const defaultState = {
  businessLogo: "",
  instaHandleId: null,
  instaHasNextPage: null,
  instaEndCursor: null,
  instagramPostList: [],
  products_to_hide_list: [],
  products_to_hide_id: null,
  getWebProductsLoading: false,
  savingWebProducts: false,
  message: null,
  weburl: "",
  webproducts: [],
  media: {},
};

/**
 *
 *
 * @param {*} [state=defaultState]
 * @param {*} action
 * @returns
 */
const optimizeWebsiteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_INSTAGRAM_POST_LOADING:
      return {
        ...state,
        instagramPostLoading: action.payload,
        // errorInstaHandle: !action.payload.error,
        // errorInstaHandleMessage: action.payload.errorMessage,
        instagramPostList: [],
        businessLogo: "",
        instaHandleId: null,
        instaHasNextPage: null,
        instaEndCursor: null,
      };
    case actionTypes.GET_INSTAGRAM_POST:
      return {
        ...state,
        instagramPostList: action.payload.imagesList,
        businessLogo: action.payload.businessLogo,
        instagramPostLoading: false,
        instaHandleId: action.payload.instaHandleId,
        instaHasNextPage: action.payload.instaHasNextPage,
        instaEndCursor: action.payload.instaEndCursor,
      };
    case actionTypes.ERROR_GET_INSTAGRAM_POSTS:
      return {
        ...state,
        instagramPostList: [],
        businessLogo: "",
        instaHandleId: null,
        instaHasNextPage: null,
        instaEndCursor: null,
        // errorInstaHandle: true,
        errorInstaHandle: action.payload.error,
        instagramPostLoading: false,
        errorInstaHandleMessage: action.payload.errorMessage,
      };

    case actionTypes.SET_LOADING: {
      return {
        ...state,
        loadingInstaDetail: action.payload,
      };
    }

    case actionTypes.SET_HIDDEN_INSTAGRAM_POST: {
      return {
        ...state,
        products_to_hide_list: action.payload.products_to_hide_list,
        products_to_hide_id: action.payload.products_to_hide_id,
        getWebProductsLoading: false,
      };
    }
    case actionTypes.ERROR_SET_HIDDEN_INSTAGRAM_POST: {
      return {
        ...state,
        products_to_hide_list: [],
        products_to_hide_id: null,
        getWebProductsLoading: false,
      };
    }

    case actionTypes.SAVE_WEB_PRODUCTS_LOADING:
      return {
        ...state,
        savingWebProducts: action.payload,
      };
    case actionTypes.SUCCESS_SAVE_WEB_PRODUCTS:
      return {
        ...state,
        // savingWebProducts: false,
        products_to_hide_id: action.payload.id,
        products_to_hide_list: action.payload.webproducts,
        message: action.payload.message,
      };
    case actionTypes.ERROR_SAVE_WEB_PRODUCTS:
      return {
        ...state,
        savingWebProducts: false,
        message: action.payload.message,
      };
    case actionTypes.ERROR_GET_MORE_INSTAGRAM_POSTS: {
      return {
        ...state,
        instaHasNextPage: null,
        instaEndCursor: null,
        loadingMoreInstaPost: false,
      };
    }
    case actionTypes.SET_LOADING_GET_WEB_PRODUCTS: {
      return {
        ...state,
        getWebProductsLoading: action.payload,
      };
    }
    case actionTypes.GET_MORE_INSTAGRAM_POSTS: {
      const list = [...state.instagramPostList, ...action.payload.imagesList];
      // console.log("list", list);
      return {
        ...state,
        instaHasNextPage: action.payload.instaHasNextPage,
        instaEndCursor: action.payload.instaEndCursor,
        instagramPostList: list,
        loadingMoreInstaPost: false,
      };
    }
    case actionTypes.LOADING_MORE_INSTAGRAM_POSTS: {
      return {
        ...state,
        loadingMoreInstaPost: action.payload,
      };
    }
    case actionTypes.SET_WEB_PRODUCTS_LIST: {
      return {
        ...state,
        webproducts: action.payload,
        getWebProductsLoading: false,
      };
    }
    case actionTypes.DELETE_WEB_PRODUCT: {
      const product_id = action.payload;
      let webproducts = state.webproducts;
      webproducts = webproducts.filter((prod) => prod.id !== product_id);

      return {
        ...state,
        webproducts,
      };
    }
    case actionTypes.SET_WEB_PRODUCTS: {
      let webproducts = state.webproducts;
      return {
        ...state,
        webproducts: [action.payload, ...webproducts],
      };
    }
    case actionTypes.SAVE_PRODUCT_MEDIA: {
      return {
        ...state,
        media: action.payload,
      };
    }
    default:
      return state;
  }
};

export default optimizeWebsiteReducer;
