import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, serachTextByJob } = useSelector((state) => state.jobs);
  const nevigate = useNavigate();
  const [filterCompany, setfilterCompany] = useState(allAdminJobs);

  useEffect(() => {
    const filterdCompany = allAdminJobs.filter((job, index) => {
      if (!serachTextByJob) {
        return true;
      }

      return job?.company?.name
        ?.toLowerCase()
        .includes(serachTextByJob.toLowerCase());
    });
    setfilterCompany(filterdCompany);
  }, [allAdminJobs, serachTextByJob]);

  return (
    <div className="max-w-[75vw]">
      <Table>
        <TableCaption>A list of your recent posted jobs </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length <= 0 ? (
            <span>No Companies Found</span>
          ) : (
            <>
              {filterCompany?.map((job, index) => (
                <tr key={index}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.company?.createdAt.split("T")[0]}</TableCell>
                  <TableCell className={"text-right cursor-pointer"}>
                    <Popover className="">
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer">
                          {" "}
                        </MoreHorizontal>
                      </PopoverTrigger>
                      <PopoverContent className="w-30 p-2 border border-gray-400 rounded-xl bg-white">
                        
                          <div
                            className="flex items-center justify-start gap-2"
                            onClick={() =>
                              nevigate(`/admin/companies/${job?.company?._id}`)
                            }
                          >
                            <Edit2 className="w-5"></Edit2>
                            <span className="text-md">Edit</span>
                          </div>
                    
                        
                          <div
                            className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                            onClick={() =>
                              nevigate(`/admin/jobs/${job._id}/applicants`)
                            }
                          >
                            <Eye className="w-4" />
                            <span className="text-md">Applicants</span>
                          </div>
                       
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
