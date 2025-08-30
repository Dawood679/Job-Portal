import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utilis/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const companyarr = ["dfdsf"];
const Postjob = () => {
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });
  const [loading, setloading] = useState(false);
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const neviagte = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        neviagte("/admin/jobs");
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  const handlerforselect = (value) => {
    const findcompnay = allCompanies.find(
      (company, index) => company.name.toLowerCase() == value
    );
    setinput({ ...input, companyId: findcompnay?._id });
  };
  const { allCompanies } = useSelector((state) => state.comapny);
  return (
    <div>
      <Navbar></Navbar>
      

      <div className="w-screen flex items-center justify-center my-5">
        <form onSubmit={submitHandler} className="p-10 shadow-lg ">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                type={"text"}
                value={input.value}
                onChange={changeEventHandler}
                name="title"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1 "
                }
              ></Input>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type={"text"}
                onChange={changeEventHandler}
                value={input.description}
                name="description"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              ></Input>
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type={"text"}
                onChange={changeEventHandler}
                value={input.requirements}
                name="requirements"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              ></Input>
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type={"text"}
                onChange={changeEventHandler}
                value={input.salary}
                name="salary"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              ></Input>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type={"text"}
                onChange={changeEventHandler}
                value={input.location}
                name="location"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              ></Input>
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                type={"text"}
                value={input.jobType}
                onChange={changeEventHandler}
                name="jobType"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              ></Input>
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type={"text"}
                value={input.experience}
                onChange={changeEventHandler}
                name="experience"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              ></Input>
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type={"number"}
                value={input.position}
                onChange={changeEventHandler}
                name="position"
                className={
                  "focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                }
              ></Input>
            </div>
            {allCompanies.length >= 0 && (
              <Select onValueChange={handlerforselect}>
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent className={"bg-white cursor-pointer"}>
                  <SelectGroup>
                    {allCompanies.map((comapny, index) => (
                      <SelectItem key={index} value={comapny?.name?.toLowerCase()}>
                        {comapny?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}

            <div className="w-full col-span-2">
              {loading ? (
                <div>
                  <Button
                    className={"bg-black text-white w-full cursor-pointer"}
                    type="submit"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                    Please Wait
                  </Button>
                </div>
              ) : (
                <Button
                  className={"bg-black text-white w-full cursor-pointer"}
                  type="submit"
                >
                  Post New Job
                </Button>
              )}
              {allCompanies.length === 0 && (
                <p className="text-sm text-red-600 font-bold text-center my-3">
                  Please register a compnay first before posting a job
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Postjob;
