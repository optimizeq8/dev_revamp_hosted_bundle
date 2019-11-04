import axios from "axios";
import qs from "qs";
import { AsyncStorage, I18nManager } from "react-native";
import i18n from "i18n-js";
import * as actionTypes from "./actionTypes";

export const getLanguageListPOEdit = language => {
  return async (dispatch, getState) => {
    const response = await axios.post(
      "https://api.poeditor.com/v2/terms/list",
      qs.stringify({
        api_token: "12aec028da2333797aaaa1768d444fb9",
        id: "283545",
        language
      })
    );

    if (response.data.response.status === "success") {
      await AsyncStorage.setItem("appLanguage", language);
      const terms = response.data.result.terms;
      if (terms.length > 0) {
        var modifierJson = {};
        terms.map(term => {
          modifierJson[term.term] = term.translation.content;
        });

        I18nManager.allowRTL(language === "ar");
        I18nManager.forceRTL(language === "ar");
        // console.log("language getLanguageListPOEdit", language);
        // console.log("modiferJson", modifierJson);
        i18n.translations = {
          [language]: modifierJson
        };

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
