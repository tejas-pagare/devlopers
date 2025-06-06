import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name:"connections",
  initialState:[],
  reducers:{
    addRequests:(state,action)=>{
      return action.payload;
    },
    removeRequest:(state,action)=>{
      let newRequests = state.filter((request)=>request?._id!==action.payload);
      return newRequests;
    }
  }
});
export const {addRequests,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;