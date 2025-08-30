import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicationTable from "./ApplicationTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utilis/constant";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setALLApplicant } from "@/redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { Applicants } = useSelector((state) => state.application);

  useEffect(() => {
    try {
      async function fetchdata() {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicant`,
          { withCredentials: true }
        );
        if (res.data.success) {
         
          dispatch(setALLApplicant(res.data.job));
        }
      }
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-[75vw] mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applications ({Applicants?.application?.length})
        </h1>
        <ApplicationTable />
      </div>
    </div>
  );
};

export default Applicants;
