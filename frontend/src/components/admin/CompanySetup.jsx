import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, AwardIcon, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utilis/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetComapnyById from "@/hooks/useGetComapnyById";

const CompanySetup = () => {
  
  
  const [input, setinput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const compnayId = useParams();
  useGetComapnyById(compnayId.id)
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.files?.[0] });
  };
  const [loading, setloading] = useState(false);
  const nevigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", input.name);
    formdata.append("description", input.description);
    formdata.append("website", input.website);
    formdata.append("location", input.location);
    if (input.file) {
      formdata.append("file", input.file);
    }
    try {
      setloading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${compnayId.id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.msg);
        nevigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  const { singleCompnay } = useSelector((state) => state.comapny);
  useEffect(() => {
    setinput({
      name: singleCompnay.name || "",
      description: singleCompnay.description || "",
      website: singleCompnay.website || "",
      location: singleCompnay.location || "",
      file: singleCompnay.file || "",
    });
  }, [singleCompnay]);

  return (
    <div>
      <Navbar></Navbar>

      <div className="max-w-[45vw] mx-auto my-5">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              className={
                "flex items-center gap-2 text-gray-500 font-semibold cursor-pointer"
              }
              onClick={() => nevigate("/admin/companies")}
            >
              <ArrowLeft></ArrowLeft>
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl ">Company Setup </h1>
          </div>
          <div className="grid grid-cols-2  gap-4">
            <div>
              <Label>Compnay Name</Label>
              <Input
                type={"text"}
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type={"text"}
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type={"text"}
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type={"text"}
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Image</Label>
              <Input
                type={"file"}
                name="file"
                accept="image/*"
                onChange={changeFileHandler}
              ></Input>
            </div>
          </div>
          <Button
            className={"w-full mt-8 bg-black text-white cursor-pointer"}
            type="submit"
          >
            {loading ? (
              <Button
                className={
                  "w-full my-4 bg-black text-white cursor-pointer hover:bg-zinc-900"
                }
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className={
                  "w-full my-4 bg-black text-white cursor-pointer hover:bg-zinc-900"
                }
              >
                Update
              </Button>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
