import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utilis/constant";
import { toast } from "sonner";
import { Button } from "../ui/button";
const listing = ["Accepted", "Rejected"];
const ApplicationTable = () => {
  const { Applicants } = useSelector((state) => state.application);

  const statusHandler = async (status, id) => {
    try {
      console.log(status, id);
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied use</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>FullName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className={"text-right"}>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Applicants?.application?.map((item, index) => (
            <tr key={index}>
              <TableCell>{item.applicant.fullName}</TableCell>
              <TableCell>{item.applicant.email}</TableCell>
              <TableCell>{item.applicant.phoneNumber}</TableCell>
              <TableCell>
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 "
                  >
                    {item.applicant.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>Not Exists</span>
                )}
              </TableCell>
              <TableCell>{item.applicant.createdAt.split("T")[0]}</TableCell>
              <TableCell className={"text-right"}>
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <MoreHorizontal></MoreHorizontal>
                  </PopoverTrigger>
                  <PopoverContent
                    className={"w-28 cursor-pointer flex flex-col gap-2"}
                  >
                    {listing.map((status, index) => {
                      return (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                        >
                          <Button
                            className={
                              "bg-black text-white w-20 cursor-pointer"
                            }
                          >
                            {status}
                          </Button>
                        </div>
                      );
                    })}{" "}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
