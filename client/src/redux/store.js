import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import managerReducer from "./slices/managerSlice";

const userConfig = {
  key: "user",
  storage,
  whitelist: ["123"],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
    post: persistReducer(userConfig, postReducer),
    manager: persistReducer(userConfig, managerReducer),
  },
});

export const persist = persistStore(store);
