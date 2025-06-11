import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cardReducer from "./createCardSlice";

const store = configureStore({
  reducer: {
    createCardSlice: cardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
