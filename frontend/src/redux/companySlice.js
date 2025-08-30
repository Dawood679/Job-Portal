import { createSlice } from "@reduxjs/toolkit";


const companySLice  = createSlice({
    name:"comapny",
    initialState:{
        singleCompnay:null,
        allCompanies:[],
        searchComapny:""
    },
    reducers:{
        setSingleComapny:(state,action)=>{
            state.singleCompnay  = action.payload
        }
        ,
        setallCompaines:(state,action)=>{
            state.allCompanies = action.payload
        }
        ,
        setsearchComapny:(state,action)=>{
            state.searchComapny = action.payload
        }
    }
})

export const {setSingleComapny,setallCompaines,setsearchComapny} = companySLice.actions
export default companySLice.reducer