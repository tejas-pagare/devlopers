import { configureStore }  from "@reduxjs/toolkit";
import user from "./slices/user.js"
import feed from "./slices/feed.js"
import connection from "./slices/connection.js"
import request from "./slices/request.js"
const appStore = configureStore({
  reducer: {
    user,
    feed,
    connection,
    request
  }
});

export default appStore;