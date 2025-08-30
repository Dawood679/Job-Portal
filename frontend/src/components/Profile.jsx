import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";
const skills = ["Html", "CSS", "JavaScript", "react"];
const Profile = () => {
  const [open, setopen] = useState(false);
  const isRusume = true;
  const { user } = useSelector((state) => state.auth);
  useGetAppliedJob();

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-[75vw] mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-9 ">
            <Avatar className={"w-24 h-24"}>
              <AvatarImage src={user.profile?.profilePhoto}></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl ">{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <div>
            <Button
              className={"text-right cursor-pointer"}
              variant={"outline"}
              onClick={() => setopen((pre) => !pre)}
            >
              <Pen className="cursor-pointer"></Pen>
            </Button>
          </div>
        </div>
        <div className="flex flex-col my-5">
          <div className="flex items-center gap-3">
            {" "}
            <Mail></Mail>
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Contact></Contact>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1 className="font-bold ">Skills</h1>

          {user?.profile?.skills.length !== 0
            ? user?.profile?.skills?.map((items, index) => (
                <Badge key={index}>{items}</Badge>
              ))
            : "N/A"}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className={"text-md font-bold"}>Resume</Label>
          {isRusume ? (
            <a
              target="blank"
              href={`${user.profile.resume}`}
              className="text-blue-400 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            "N/A"
          )}
        </div>
      </div>
      <div className="max-w-[75vw] p-5 mx-auto bg-white rounded-2xl border border-gray-300">
        <h1 className="font-bold text-lg">Applied Jobs</h1>

        <AppliedJobTable></AppliedJobTable>
      </div>
      <UpdateProfileDialog open={open} setopen={setopen}></UpdateProfileDialog>
    </div>
  );
};

export default Profile;
