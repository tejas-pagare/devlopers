import { configureStore }  from "@reduxjs/toolkit";
import user from "./slices/user.js"
import feed from "./slices/feed.js"
import connection from "./slices/connection.js"
const appStore = configureStore({
  reducer: {
    user,
    feed,
    connection
  }
});

export default appStore;