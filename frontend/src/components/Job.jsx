import React from "react";
import { Button } from "./ui/button";
import {  Bookmark } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const neviagate = useNavigate()
  const jobId = 1

  const daysAgoFunc = (mongoTime) => {
  const createdAt = new Date(mongoTime);
  const currentTime = new Date();
  const diff = currentTime - createdAt; // milliseconds

  return Math.floor(diff / (1000 * 60 * 60 * 24)); // ms → days
};

  
  return (
    <div className=" p-10 rounded-md shadow-xl bg-white border border-gray-100 ">
      <div className="flex justify-between items-center">
        <p>{job?.createdAt == 0 ? "Today":`${daysAgoFunc(job.createdAt)} days ago` }</p>
        <Button className="rounded-full border border-gray-400" size="icon">
          <Bookmark size={"28"} className="cursor-pointer"></Bookmark>
        </Button>
      </div>

      <div className="flex items-center gap-2 my-1">
        <Button className={"p-6"} variant={"outline"} size="icon">
          <Avatar>
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQzTqf4PP114GWttWIg40iuC5fec3-4dA11w&s"
              alt="fjdksfj"
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="font-sm text-gray-500">Pakistan</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
         {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
         {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <Button variant={"outline"} onClick={()=>neviagate(`/description/${job?._id}`)} className={"cursor-pointer"}>Details</Button>
        <Button className={"bg-[#7209b7] text-white cursor-pointer  "} >Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;
