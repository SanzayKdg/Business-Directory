import { configureStore } from "@reduxjs/toolkit";
import businessReducer from "../features/Business/Business";
const store = configureStore({
  reducer: {
    business: businessReducer,
  },
});

export default store;
