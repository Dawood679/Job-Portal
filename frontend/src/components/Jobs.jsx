import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const Jobs = () => {
  const { homepagejobs, searchQuery } = useSelector((state) => state.jobs);
  const [filterjobs, setfilterjobs] = useState(homepagejobs);
  useEffect(() => {
    if (searchQuery) {
      const filterdjobs = homepagejobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setfilterjobs(filterdjobs);
    } else {
      setfilterjobs(homepagejobs);
    }
  }, [homepagejobs, searchQuery]);

  return (
    <div>
      <Navbar></Navbar>

      <div className="max-w-[75vw] mx-auto mt-5">
        <div className="flex gap-2">
          <div className="w-[10%]">
            <FilterCard></FilterCard>
          </div>
          {filterjobs?.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[70vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterjobs?.map((job, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    {" "}
                    <Job job={job}></Job>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
