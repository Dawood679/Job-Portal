import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utilis/constant";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);

      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.msg);
        nevigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex justify-between mx-auto h-16 items-center max-w-[75vw]">
        <div>
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#f83002]">Portal</span>
            </h1>
          </Link>
        </div>
        <div className="flex gap-12 items-center">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-5">
              <Link to={"/login"}>
                <Button className={"cursor-pointer"}>Login</Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-[#6a38c2] hover:bg-[#4511a0] cursor-pointer">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.profile.profilePhoto} />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 outline-none border-1 p-4 rounded-2xl bg-white">
                  <div className="flex gap-4 space-y-3 ">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.profile.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{user.fullName}</h4>
                      <p className="text-muted-foreground text-[14px]">
                        {user.profile.bio}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      {user && user.role == "student" && (
                        <>
                          <Link to="/profile" className="flex items-center">
                            <User2 />
                            <Button variant="link" className="cursor-pointer">
                              View Profile
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                    <div className="flex items-center">
                      <LogOut></LogOut>
                      <Button
                        variant="link"
                        className="cursor-pointer"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
