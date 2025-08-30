import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setsearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const catagory = [
  "Frotend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  function onjobHandler(query){
    
      dispatch(setsearchQuery(query))
      nevigate("/browse")
    }
  return (
    <div>
      <Carousel className={"w-full max-w-xl mx-auto"}>
        <CarouselContent>
          {catagory?.map((items, index) => (
            <CarouselItem key={index} className={"md:basis-1/2 lg:basis-1/3 "}>
              <Button className={"bg-zinc-950 text-white rounded-full cursor-pointer"} onClick={()=>onjobHandler(items)}>{items}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={"cursor-pointer"}></CarouselPrevious>
        <CarouselNext className={"cursor-pointer"}></CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
