import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utilis/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleComapny } from "@/redux/companySlice";

const CompanyCreate = () => {
  const nevigate = useNavigate();
  const [companyName, setcompanyName] = useState();
  const dispatch = useDispatch()
  const registorComapny = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true
      });

      if(res.data.success){
        dispatch(setSingleComapny(res.data.companyfind))
        toast.success(res.data.msg)
        const compantId = res.data.companyfind._id
        nevigate(`/admin/companies/${compantId}`)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-[75vw] mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Comapny Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>
        <Label>Comapny Name</Label>
        <Input
          onChange={(e) => setcompanyName(e.target.value)}
          type={"text"}
          className={"my-2"}
          placeholder="JobHunt,Microsoft etc"
        ></Input>
        <div className="flex items-center gap-2 my-10">
          <Button
            variant={"outline"}
            className={"cursor-pointer"}
            onClick={() => nevigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button className={"bg-black text-white cursor-pointer"} onClick={registorComapny}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
