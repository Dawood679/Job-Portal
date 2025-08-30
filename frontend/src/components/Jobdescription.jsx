import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utilis/constant";
import { toast } from "sonner";
import { setSingleJob } from "@/redux/jobSlice";

const Jobdescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allJobs } = useSelector((state) => state.jobs);
  useEffect(() => {
    try {
      async function fetchSinglejobs() {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setisApplied(res.data.job.application.some((applications)=>applications.applicant == user._id))
        }
      }
      fetchSinglejobs();
    } catch (error) {
      console.log(error);
    }
  }, [jobId, dispatch]);
  let { singleJob } = useSelector((state) => state.jobs);
  const isINitailApllied =
    allJobs.application?.some(
      (application) => application.applicant == user._id
    ) || false;

  const[isApplied,setisApplied] = useState(isINitailApllied)

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setisApplied(true)
        const updateSingleJob = {...singleJob,application:[...singleJob.application,{applicant:user?._id}]}
        dispatch(setSingleJob(updateSingleJob))  // help us to update the realtime update
        toast.success(res.data.msg);
      }
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
 
  return (
    <div className="max-w-[75vw] mx-auto my-10">
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#f83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] text-white cursor-pointer hover:bg-[#55048b]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-2">
        {singleJob?.description}
      </h1>
      <div>
        <h1 className="font-bold my-1 ">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Experince:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.application?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1 ">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Jobdescription;
