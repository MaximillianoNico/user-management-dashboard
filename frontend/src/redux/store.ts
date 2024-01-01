import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./services/users";

import userReducer from "./features/userSelect";

export const store = configureStore({
  reducer: {
    userReducer,
    [userAPI.reducerPath]: userAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;