import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompinesTable from "./CompinesTable";
import { useNavigate } from "react-router-dom";
import useGetCompanies from "@/hooks/useGetCompanies";
import { useDispatch } from "react-redux";
import { setsearchComapny } from "@/redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminsJobs from "@/hooks/useGetAllAdminsJobs";
import { setserachTextByJob } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminsJobs()
  const neviagate = useNavigate();
  useGetCompanies();
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setserachTextByJob(input));
  }, [input]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-[75vw] mx-auto my-10 ">
        <div className="flex items-center justify-between my-5">
          <Input
            className={"w-fit "}
            placeholder="Filter by Name"
            onChange={(e) => setinput(e.target.value)}
          ></Input>
          <Button
            className={"bg-black text-white cursor-pointer"}
            onClick={() => neviagate("/admin/job/post")}
          >
            Post New Jobs
          </Button>
        </div>

       <AdminJobsTable></AdminJobsTable>
      </div>
    </div>
  );
};

export default AdminJobs;
