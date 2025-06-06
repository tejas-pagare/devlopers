import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name:"feed",
  initialState:[],
  reducers:{
    addFeed:(state,action)=>{
      return action.payload;
    },
    removeFeed:(state,action)=>{
      let newFeed = state.filter((feed)=>feed?._id!==action.payload);
      return newFeed;
    }
  }
});

export const {addFeed,removeFeed} = feedSlice.actions;
export default feedSlice.reducer;