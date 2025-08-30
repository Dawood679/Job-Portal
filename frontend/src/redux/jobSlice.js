import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs: [],
    serachTextByJob: "",
    searchQuery:"",
    homepagejobs:[]
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setallAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setserachTextByJob:(state,action)=>{
      state.serachTextByJob = action.payload
    },
    setsearchQuery:(state,action)=>{
      state.searchQuery = action.payload
    },sethomepagejobs:(state,action)=>{
      state.homepagejobs = action.payload
    }

  },
});

export const { setAllJobs, setSingleJob, setallAdminJobs,setserachTextByJob ,setsearchQuery,sethomepagejobs} = jobSlice.actions;
export default jobSlice.reducer;
