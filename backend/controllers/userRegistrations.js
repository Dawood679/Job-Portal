import { User } from "../Models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utilis/dataUri.js";
import cloudinary from "../utilis/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    console.log(req.body)
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.json({ msg: "All fields are required", success: false });
    }
    const file  = req.file
    let fileUri;
    let cloudResponse;
    if(file){
       fileUri = getDataUri(file)
       cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    }
    

    

    const allreadyUser = await User.findOne({ email });

    if (allreadyUser) {
      return res.json({
        msg: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      profile:{
        profilePhoto:cloudResponse?.secure_url || ""
      }
    });
    return res.json({ msg: "User is created Successfull", user ,success:true});
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.json({ msg: "All fields are required", success: false });
  }

  let user = await User.findOne({ email });

  if (!user) {
    return res.json({ msg: "Email or password are incorrect" ,success:false});
  }

  const hashpassword = await bcrypt.compare(password, user.password);

  if (!hashpassword) {
    return res.json({ msg: "Email or password are incorrect",success:false });
  }

  if (role !== user.role) {
    return res.json({ msg: "Account doesn't exist with this role",success:false });
  }

  const tokendata = {
    userId: user._id,
  };

  const token = jwt.sign(tokendata, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  user = {
    _id: user._id,
    fullName: user.fullName,
    role: user.role,
    phoneNumber: user.phoneNumber,
    email: user.email,
    profile:user.profile
  };

  return res
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    })
    .json({ msg: `Welcome back ${user.fullName}`,user,success:true });
};

export const logout = async (req, res) => {
  try {
    return res
      .cookie("token", "", { maxAge: 0 })
      .json({ msg: "Logout Successfully",success:true });
  } catch (error) {
    console.log(error);
  }
};

export const updataProfile = async (req, res) => {
  try {
    console.log(req.body)
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    // clodinary aye ga idhr
      const file = req.file
      let fileUri;
      let cloudResponse
      if(file){
        fileUri = getDataUri(file)
        cloudResponse = await cloudinary.uploader.upload(fileUri.content )
      }
       


    let skillArray;
    if (skills) {
      skillArray = skills.split(",");
    }
    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.json({ msg: "Please logged In" ,success:false});
    }
    if(fullName){
      user.fullName = fullName
    }
    if(email){
      user.email = email
    }
    if(phoneNumber){
      user.phoneNumber = phoneNumber
    }
    if(bio){
      user.profile.bio = bio
    }
    if(skills){
      user.profile.skills = skillArray
    }

    if(cloudResponse){
      user.profile.resume = cloudResponse.secure_url // save the cloudinarhy 
      user.profile.resumeOriginalName = file.originalname // save orginal name
    }
    await user.save()

    user = {
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
      phoneNumber: user.phoneNumber,
      email: user.email,
      profile:user.profile
    };
    console.log(user)

    

    return res.json({ msg: "profile is update successfully", user ,success:true});
  } catch (error) {
    console.log(error);
  }
};
