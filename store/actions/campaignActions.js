import axios from "axios";
import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const payment_request_knet = (campaign_id, openBrowser) => {
  return dispatch => {
    instance
      .get(`makeknetpayment/${campaign_id}`)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        console.log(data);
        return dispatch({
          type: actionTypes.PAYMENT_REQUEST_URL,
          payload: data
        });
      })
      .then(() => dispatch(openBrowser()))
      .catch(err => {
        console.log(err);
      });
  };
};

export const snap_ad_audience_size = (info, totalReach) => {
  return (dispatch, getState) => {
    console.log("sanp ad", info);

    instance
      .post(`snapaudiencesize`, info)
      .then(res => {
        console.log("snap_ad_audience_size", res.data);
        return res.data;
      })
      .then(data => {
        console.log(data);
        return dispatch({
          type: actionTypes.SET_SNAP_AUDIENCE_SIZE,
          payload: data
        });
      })
      .then(() => dispatch(get_total_reach(totalReach)))
      .catch(err => {
        console.log(err);
      });
  };
};

export const get_total_reach = info => {
  return dispatch => {
    instance
      .post("snapaudiencesize", info)
      .then(res => {
        console.log("get total", res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_SNAP_TOTAL_AUDIENCE_SIZE,
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const ad_objective = (info, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING,
      payload: true
    });
    console.log(info);
    instance
      .post(`savecampaign`, info)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        console.log(data);
        return dispatch({
          type: actionTypes.SET_AD_OBJECTIVE,
          payload: data
        });
      })
      .then(() => {
        navigation.push("AdDesign");
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const ad_design = (
  info,
  laoding,
  navigation,
  onToggleModal,
  appChoice
) => {
  onToggleModal();
  return dispatch => {
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "Content-Type": "multipart/form-data"
    };
    instance
      .post(`savebrandmedia`, info, {
        onUploadProgress: ProgressEvent =>
          laoding((ProgressEvent.loaded / ProgressEvent.total) * 100)
      })
      .then(res => {
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_DESIGN,
          payload: data
        });
      })
      .then(() =>{
        onToggleModal();
        navigation.replace("AdDetails", {
          image: info._parts[0][1].uri,
          appChoice: appChoice
        })
    })
      .catch(err => {
        laoding(0);

        console.log(err);
      });
  };
};

export const get_interests = countryCode => {
  return (dispatch, getState) => {
    instance
      .get(`interestsbycountry/${countryCode}`)
      .then(res => {
        return res.data.interests;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_INTERESTS,
          payload: data
        });
      })
      .catch(err => {
        dispatch(console.log(err));
      });
  };
};

export const get_device_brands = () => {
  return (dispatch, getState) => {
    instance
      .get(`deviceBrands`)
      .then(res => {
        return res.data.targeting_dimensions;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_DEVICE_MAKES,
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const get_ios_versions = () => {
  return (dispatch, getState) => {
    instance
      .get(`osversion/iOS`)
      .then(res => {
        return res.data.targeting_dimensions;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_IOS_VERSIONS,
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const get_android_versions = () => {
  return (dispatch, getState) => {
    instance
      .get(`osversion/ANDROID`)
      .then(res => {
        return res.data.targeting_dimensions;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_ANDROID_VERSIONS,
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const ad_details = (info, interestNames, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING,
      payload: true
    });
    instance
      .post(`savetargeting`, info)
      .then(res => {
        console.log("back end", res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_DETAILS,
          payload: data
        });
      })
      .then(() => {
        navigation.navigate("AdPaymentReview", {
          interestNames: interestNames
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const updateCampaign = (info, businessid, navigation) => {
  return (dispatch, getState) => {
    instance
      .put(`savetargeting`, { ...info, businessid })
      .then(res => {
        console.log("back end", res.data);
        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.UPDATE_CAMPAIGN_DETAILS,
          payload: data
        });
      })
      .then(() => {
        navigation.navigate("Dashboard");
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const updateStatus = (info, handleToggle) => {
  return (dispatch, getState) => {
    instance
      .put(`updateCampaignStatus`, info)
      .then(res => {
        console.log("back end", res.data);
        return res.data;
      })
      .then(data => {
        handleToggle(data.status);
        return dispatch({
          type: actionTypes.UPDATE_CAMPAIGN_STATUS,
          payload: data
        });
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const filterCampaigns = query => {
  return {
    type: actionTypes.FILTER_CAMPAIGNS,
    payload: query
  };
};
