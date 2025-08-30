import { setallAppiedjob } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "@/utilis/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJob = () => {
  const dipatch = useDispatch();
  useEffect(() => {
    try {
      async function fetchdata() {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dipatch(setallAppiedjob(res.data.application));
        }
      }
      fetchdata()
    } catch (error) {
      console.log(error);
    }
  }, []);
};

export default useGetAppliedJob;
