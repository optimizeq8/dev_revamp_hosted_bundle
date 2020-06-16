import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";

import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import omit from "lodash/omit";

const initialState = {};
const middleware = [thunk];

let blacklistTransform = createTransform((inboundState, key) => {
  switch (key) {
    case "campaignC":
      inboundState = { ...inboundState, loadingStoryAdsArray: [] };
      inboundState = omit(inboundState, [
        "loadingObj",
        "loadingDesign",
        "loadingDetail",
        "loading",
        "videoUrlLoading",
        "coverLoading",
        "instagramPostLoading",
        "getWebProductsLoading",
        "webUploadLinkMediaLoading",
        "collectionLoader",
        "loadingMoreInstaPost",
        "campaignProgressStarted",
      ]);
      break;
    case "googleAds":
      inboundState = { ...inboundState, uploading: false, loading: false };
      inboundState = omit(inboundState, ["campaignResumed"]);
      break;
    case "instagramAds":
      inboundState = { ...inboundState, loadingStoryAdsArray: [] };
      inboundState = omit(inboundState, [
        "loadingObj",
        "loadingDesign",
        "loadingDetail",
        "loading",
        "videoUrlLoading",
        "coverLoading",
        "instagramPostLoading",
        "getWebProductsLoading",
        "webUploadLinkMediaLoading",
        "collectionLoader",
        "loadingMoreInstaPost",
        "campaignProgressStarted",
      ]);
      break;
    default:
      inboundState = inboundState;
      break;
  }

  return inboundState;
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["campaignC", "googleAds", "instagramAds"],
  transforms: [blacklistTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);

export default store;
