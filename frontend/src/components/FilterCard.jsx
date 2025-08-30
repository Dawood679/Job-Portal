import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setsearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Islambad", "Lahore", "Multan", "Karachi"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack", "Ai"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42K-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectvalue,setselectvalue] = useState("")
  const dispatch = useDispatch()
  const handleChange = (value)=>{
    setselectvalue(value?.toLowerCase())
  }
  useEffect(() => {
    dispatch(setsearchQuery(selectvalue))
  }, [selectvalue])

  
  return (
    <div>
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-2" />
      <div>
        <RadioGroup onValueChange={handleChange} value={selectvalue}>
          {filterData.map((items, index) => (
            <div key={index} >
              <h1 className="font-bold text-lg">{items.filterType}</h1>
              {items?.array.map((data, index1) => {
                const itemid = `id${index}-${index1}`
                return <div className="flex items-center space-x-2 my-2" key={index1}>
                  <RadioGroupItem value={data} id={itemid}/>
                  <Label htmlFor={itemid}>{data}</Label>
                  

                  
                </div>
              }
                
                
              )}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
