import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT, USER_API_END_POINT } from "@/utilis/constant";
import axios from "axios";
import React, { useDebugValue, useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (id) => {
  let dispatch = useDispatch();
  
};

export default useGetSingleJob;
