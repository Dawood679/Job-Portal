import { setAllJobs, sethomepagejobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT, USER_API_END_POINT } from "@/utilis/constant";
import axios from "axios";
import React, { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCategoryCarousel = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    try {
      async function fetchAlljobs() {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(sethomepagejobs(res.data.jobs));
        }
      }
      fetchAlljobs();
    } catch (error) {
      console.log(error);
    }
  }, []);
};

export default useCategoryCarousel;
