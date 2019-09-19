import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";

import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";

const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["campaignC"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);
export default store;
