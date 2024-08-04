import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/lib/features/auth/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
