import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name:"connections",
  initialState:[],
  reducers:{
    addConnections:(state,action)=>{
      return action.payload;
    },
    removeConnection:(state,action)=>{
      return [];
    }
  }
});
export const {addConnections,removeConnection} = connectionSlice.actions;
export default connectionSlice.reducer;