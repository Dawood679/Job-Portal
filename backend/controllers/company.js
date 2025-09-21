import { Company } from "../Models/CompanySchema.js";
import  getDataUri  from "../utilis/dataUri.js";
import cloudinary from "cloudinary";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

  if (!companyName) {
    return res.json({ msg: "Company name is required",success:false });
  }
  let companyfind = await Company.findOne({ name: companyName });

  if (companyfind) {
    return res.json({ msg: "Yoy can't register same Company" ,success:false});
  }
  companyfind = await Company.create({
    name: companyName,
    userId: req.id,
  });

  return res.json({ msg: "Company created Successfully", companyfind,success:true });
  } catch (error) {
    console.log(error)
    res.json({ success:false,error:error.message });
    
  }
};

export const getCompany = async (req, res) => {
  try {
    let userId = req.id;
    const company = await Company.find({ userId });
    if (!company) {
      return res.json({ msg: "Company is not found",success:false });
    }
    // ad rahta hn

    return res.json({ company ,success:true});
  } catch (error) {
    console.log(error)
  }
};

export const getCompanyById = async (req, res) => {
  let companyId = req.params.id;
  console.log(companyId)
  const company = await Company.findById(companyId);
  console.log(company)
  if (!company) {
    return res.json({ msg: "Company is not found",success:false });
  }

  return res.json({ company ,success:true});
};

export const updateComapny = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    console.log(req.body)


    const updatedata = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updatedata, {
      new: true,
    });

    if (!company) {
      return req.json({ msg: "Company not found ",success:false });
    }

    const file = req.file;
    //cloudinray aye ga
    let fileUri;
    let myCloud;
    if(file){
       fileUri = getDataUri(file)
       myCloud = await cloudinary.uploader.upload(fileUri.content)
      company.logo = myCloud.secure_url
    }
    await company.save()

    

    return res.json({ msg: "Company data Update Successfully",company,success:true });
  } catch (error) {
    console.log(error)
  }
};
