import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "@/lib/features/auth/userSlice";

const persistConfig = {
  key: "user",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: persistedReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
