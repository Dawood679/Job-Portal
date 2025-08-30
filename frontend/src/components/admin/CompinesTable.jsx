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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompinesTable = () => {
  const { allCompanies, searchComapny } = useSelector(
    (state) => state.comapny
  );
  const nevigate = useNavigate()
  const [filterCompany, setfilterCompany] = useState(allCompanies);

  useEffect(() => {
    const filterdCompany = allCompanies.filter((company, index) => {
      if (!searchComapny) {
        return true;
      }

      return company?.name
        ?.toLowerCase()
        .includes(searchComapny.toLowerCase());
    });
    setfilterCompany(filterdCompany);
    
  }, [allCompanies, searchComapny]);

  return (
    <div className="max-w-[75vw]">
      <Table>
        <TableCaption>A list of your recent register companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length <= 0 ? (
            <span>No Companies Found</span>
          ) : (
            <>
              {filterCompany?.map((company, index) => (
                <tr key={index}>
                  <TableCell key={company._id}>
                    <Avatar>
                      <AvatarImage
                        src={company.logo}
                        alt="fjdksfj"
                      ></AvatarImage>
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className={"text-right cursor-pointer"}>
                    <Popover className="">
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer">
                          {" "}
                        </MoreHorizontal>
                      </PopoverTrigger>
                      <PopoverContent className="w-22 p-2 border border-gray-400 rounded-xl bg-white">
                        <div className="flex items-center justify-start gap-2" onClick={()=>nevigate(`/admin/companies/${company._id}`)}>
                          <Edit2 className="w-5"></Edit2>
                          <span className="text-md">Edit</span>
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

export default CompinesTable;
