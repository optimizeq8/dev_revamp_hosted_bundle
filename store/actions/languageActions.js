import axios from "axios";
import qs from "qs";
import * as actionTypes from "./actionTypes";
import { showMessage } from "react-native-flash-message";
import store from "../index";

export const getLanguageListPOEdit = language => {
  return async dispatch => {
    const response = await axios.post(
      "https://api.poeditor.com/v2/terms/list",
      qs.stringify({
        api_token: "4893d456269b4eceb169566e24c597aa",
        id: "283545",
        language
      })
    );
    // console.log('data', response.data);

    if (response.data.response.status === "success") {
      const terms = response.data.result.terms;
      if (terms.length > 0) {
        // console.log('terms', terms);
        var modifierJson = {};
        terms.map(term => {
          modifierJson[term.term] = term.translation.content;
        });
        console.log("modiferJson", modifierJson);
        return dispatch({
          type: actionTypes.SET_LANGUAGE_LIST_POEDIT,
          payload: {
            terms: modifierJson,
            language
          }
        });
      }
    }
  };
};
