import axios from "axios";
import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "https://optimizekwtestingserver.com/optimize/public/"
});

export const snap_ad_audience_size = (info, totalReach) => {
  return (dispatch, getState) => {
    instance
      .post(`snapaudiencesize`, info)
      .then(res => {
        console.log(res.data);
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
        navigation.replace("AdDesign");
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const ad_design = (info, laoding, navigation) => {
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
        console.log(res.data);
        console.log("SUCCESS!!");

        return res.data;
      })
      .then(data => {
        return dispatch({
          type: actionTypes.SET_AD_DESIGN,
          payload: data
        });
      })
      .then(() => {
        navigation.replace("AdDetails");
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
        console.log(res.data.interests);

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

export const ad_details = (info, interestNames, navigation) => {
  return (dispatch, getState) => {
    instance
      .post(`savetargeting`, info)
      .then(res => {
        console.log(res.data);
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
        dispatch(console.log(err.response.data));
      });
  };
};

export const filterCampaigns = query => {
  return {
    type: actionTypes.FILTER_CAMPAIGNS,
    payload: query
  };
};
