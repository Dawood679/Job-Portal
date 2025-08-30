import { createSlice } from "@reduxjs/toolkit";


const applicationSlice = createSlice({
  name: "application",
  initialState: {
    Applicants: [],
    allAppiedjob: [],
  },
  reducers: {
    setALLApplicant: (state, action) => {
      state.Applicants = action.payload;
    },
    setallAppiedjob: (state, action) => {
      state.allAppiedjob = action.payload;
    },
  },
});

export const { setALLApplicant,setallAppiedjob } = applicationSlice.actions;
export default applicationSlice.reducer;
