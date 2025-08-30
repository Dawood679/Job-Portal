import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER_API_END_POINT } from "@/utilis/constant";
import { toast } from "sonner";
import axios from "axios";
import { setloading } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setinput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const nevigation = useNavigate();
  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFilehandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        nevigation("/login");
        toast.success(res.data.msg);
      }
      
    } catch (error) {
      toast.error(error.res?.data.message);
    } finally {
      dispatch(setloading(false));
    }
  };
  useEffect(() => {
    if (user) {
      nevigation("/");
    }
  }, []);
   const [eye,seteye] = useState(false)
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center items-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-3">
            <Label>Full Name </Label>
            <Input
              type="text"
              placeholder="Dawood Alam"
              className={"border border-gray-200"}
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-3">
            <Label>Email </Label>
            <Input
              type="email"
              placeholder="Dawood@gmail.com"
              className={"border border-gray-200"}
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-3">
            <Label>Phone Number </Label>
            <Input
              type="number"
              placeholder="+923298231948"
              className={"border border-gray-200"}
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-3">
            <Label>Password </Label>
            <div className="flex ">
              <Input
                type={eye ? "text" :"password"}
                placeholder="Password"
                className={"border border-gray-200"}
                name="password"
                value={input.password}
                onChange={changeEventHandler}
              ></Input>
              <Button onClick={()=>seteye((prev)=>!prev)} className={'rounded-r-full bg-black text-white  cursor-pointer'}><Eye></Eye></Button>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <RadioGroup className={"flex items-center gap-4 my-2"}>
              <div className="flex items-center gap-3">
                <Input
                  type={"radio"}
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  id="r1"
                ></Input>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type={"radio"}
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  value="recruiter"
                  id="r2"
                ></Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <label>Profile</label>
              <Input
                type={"file"}
                accept="image/*"
                className={"cursor-pointer border border-gray-200"}
                name="file"
                onChange={changeFilehandler}
              ></Input>
            </div>
          </div>
          <div>
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
                Sign Up
              </Button>
            )}
            <span className="text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
