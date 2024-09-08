import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./slices/userSlice";

const userConfig = {
  key: "user",
  storage,
  whitelist: ["123"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
  },
});

export const persist = persistStore(store);
