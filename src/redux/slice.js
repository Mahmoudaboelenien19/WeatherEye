import { createSlice } from "@reduxjs/toolkit";

 const slice=createSlice({
    name:"input",
    initialState:{
        value:""
    },
    reducers:{
cityCode:(state,action)=>{
    state.value=action.payload
}
    }
})
export const {cityCode}=slice.actions
export default slice.reducer