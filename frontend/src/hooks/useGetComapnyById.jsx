import { setSingleComapny } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from "@/utilis/constant";
import axios from "axios";
import React, { useDebugValue, useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetComapnyById = (id) => {
  let dispatch = useDispatch();
  useEffect(() => {
    try {
      async function fetchAlljobs() {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleComapny(res.data.company));
         
        }
      }
      fetchAlljobs()
    } catch (error) {
      console.log(error); 
    }
  }, [id,dispatch]);
};

export default useGetComapnyById;
