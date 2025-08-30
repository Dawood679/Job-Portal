import { setallCompaines, setSingleComapny } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from "@/utilis/constant";
import axios from "axios";
import React, { useDebugValue, useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanies = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    try {
      async function fetchAlljobs() {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setallCompaines(res.data.company));
         
        }
      }
      fetchAlljobs()
    } catch (error) {
      console.log(error);
    }
  }, []);
};

export default useGetCompanies;
