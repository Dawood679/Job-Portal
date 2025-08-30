import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utilis/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setopen }) => {
  const [loading, setloading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [input, setinput] = useState({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bio: user.profile.bio,
    skills: user.profile.skills.map((items) => items),
    file: user.profile.resume,
  });
  const fileHandler = (e) => {
    let file = e.target.files[0];
    setinput({ ...input, file });
  };

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullName", input.fullName);
    formdata.append("email", input.email);
    formdata.append("phoneNumber", input.phoneNumber);
    formdata.append("bio", input.bio);
    formdata.append("skills", input.skills);

    if (input.file) {
      formdata.append("file", input.file);
    }

    try {
      setloading(true)
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/profile/update",
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      
      if (res.data.success) {
        
        toast.success(res.data.msg);
      }
      dispatch(setUser(res.data.user));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }finally{
      setloading(false)
    }

    setopen(false);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="bg-white sm:max-w-[425px]"
          onInteractOutside={() => setopen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={submitHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid gird-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className={"text-right"}>
                    Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={input?.fullName}
                    onChange={changeEventHandler}
                    className={"col-span-3"}
                  ></Input>
                </div>
                <div className="grid gird-cols-4 items-center gap-4">
                  <Label htmlFor="email" className={"text-right"}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    onChange={changeEventHandler}
                    value={input?.email}
                    className={"col-span-3"}
                  ></Input>
                </div>
                <div className="grid gird-cols-4 items-center gap-4">
                  <Label htmlFor="number" className={"text-right"}>
                    Number
                  </Label>
                  <Input
                    id="name"
                    name="number"
                    onChange={changeEventHandler}
                    value={input?.phoneNumber}
                    className={"col-span-3"}
                  ></Input>
                </div>
                <div className="grid gird-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className={"text-right"}>
                    Bio
                  </Label>
                  <Input
                    id="name"
                    name="bio"
                    onChange={changeEventHandler}
                    value={input?.bio}
                    className={"col-span-3"}
                  ></Input>
                </div>
                <div className="grid gird-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className={"text-right"}>
                    Skills
                  </Label>
                  <Input
                    id="name"
                    onChange={changeEventHandler}
                    name="skills"
                    value={input?.skills}
                    className={"col-span-3"}
                  ></Input>
                </div>
                <div className="grid gird-cols-4 items-center gap-4">
                  <Label htmlFor="file" className={"text-right"}>
                    Resume
                  </Label>
                  <Input
                    id="name"
                    name="file"
                    className={"col-span-3"}
                    onChange={fileHandler}
                    type={"file"}
                    accept="application/pdf"
                  ></Input>
                </div>
              </div>
              <div>
                <DialogFooter>
                  {loading ? (
                    <Button
                      className={
                        "w-full my-4 bg-black text-white cursor-pointer hover:bg-zinc-900"
                      }
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className={
                        "w-full my-4 bg-black text-white cursor-pointer hover:bg-zinc-900"
                      }
                    >
                      Update
                    </Button>
                  )}
                </DialogFooter>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
