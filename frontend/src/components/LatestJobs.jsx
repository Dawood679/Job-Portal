import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import useCategoryCarousel from "@/hooks/useCategoryCarousel";
import { useNavigate } from "react-router-dom";
// const randomshjobs = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobs = () => {
  const { homepagejobs } = useSelector((state) => state.jobs);
  useCategoryCarousel()
  const nevigate = useNavigate()
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold ">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {homepagejobs?.length <= 0 ? (
          <span>No Job Found</span>
        ) : (
          homepagejobs?.map((job, index) =><div onClick={()=>nevigate(`/description/${job._id}`)} key={job._id}><LatestJobCard   job={job}></LatestJobCard></div> )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
