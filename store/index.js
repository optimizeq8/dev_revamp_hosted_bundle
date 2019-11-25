import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";

import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import omit from "lodash/omit";

const initialState = {};
const middleware = [thunk];

let blacklistTransform = createTransform((inboundState, key) => {
  if (key === "campaignC") {
    inboundState = { ...inboundState, loadingStoryAdsArray: [] };
    return omit(inboundState, [
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
      "campaignProgressStarted"
    ]);
  } else {
    return inboundState;
  }
});
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["campaignC"],
  transforms: [blacklistTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);

export default store;
