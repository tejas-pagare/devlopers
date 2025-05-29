import { configureStore }  from "@reduxjs/toolkit";
import user from "./slices/user.js"
const appStore = configureStore({
  reducer: {
    user
  }
});

export default appStore;