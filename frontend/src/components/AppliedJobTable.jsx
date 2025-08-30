import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const {allAppiedjob} = useSelector(state=>state.application)
  console.log(allAppiedjob)
  return (
    <div>
      
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className={"text-right"}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppiedjob.length <= 0 ? <span>You haven't applied any job yet.</span>: allAppiedjob?.map((items, index) => (
            <TableRow key={index}>
              <TableCell>{items?.createdAt?.split("T")[0]}</TableCell>
              <TableCell>{items?.job?.title}</TableCell>
              <TableCell>{items?.job?.company?.name}</TableCell>
              <TableCell className={"text-right"}>
                <Badge className={"bg-black text-white"}>{items.status.toUpperCase()}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
