import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setallAppiedjob } from "@/redux/applicationSlice";
import useGetAlljons from "@/hooks/useGetAlljons";
const randomJobs = [1, 2, 3];
const Browse = () => {
  const {allJobs} = useSelector(state=>state.jobs)
  const dispatch  = useDispatch()
  useGetAlljons()
  useEffect(() => {
    
  
    return () => {
      dispatch(setallAppiedjob(""))
    }
  }, [])
  
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-[75vw] mx-auto my-10">
        <h1>Search Results ({allJobs?.length}) </h1>
        <div className="grid grid-cols-3 gap-2">
          {allJobs?.map((job, index) => {
            return (
              <div key={index}>
                <Job job={job}></Job>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
