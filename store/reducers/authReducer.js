import { AsyncStorage } from "react-native";
import * as actionTypes from "../actions/actionTypes";
import * as Segment from "expo-analytics-segment";
import { getUniqueId } from "react-native-device-info";
import analytics from "@segment/analytics-react-native";

const initialState = {
  userid: null,
  userInfo: null,
  loading: false,
  loadingUpdateInfo: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      AsyncStorage.getItem("appLanguage")
        .then(language => {
          // analytics.alias(action.payload.user.userid);
          analytics.identify(action.payload.user.userid, {
            ...action.payload.user,
            $name:
              action.payload.user.firstname +
              " " +
              action.payload.user.lastname,
            selected_language: language
          });
        })
        .catch(error => {
          // analytics.alias(action.payload.user.userid);
          analytics.identify(action.payload.user.userid, {
            ...action.payload.user,
            $name:
              action.payload.user.firstname + " " + action.payload.user.lastname
          });
        });

      return {
        ...state,
        userid: action.payload.user.userid,
        userInfo: action.payload.user,
        loading: false
      };

    case actionTypes.UPDATE_USERINFO:
      return {
        ...state,
        loadingUpdateInfo: false,
        userInfo: { ...state.userInfo, ...action.payload }
      };
    case actionTypes.SET_LOADING_USER:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_LOADING_ACCOUNT_UPDATE:
      return {
        ...state,
        loadingUpdateInfo: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
