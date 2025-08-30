import { Job } from "../Models/jobSchema.js";

export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.json({ msg: "Something is missing", success: false });
    }

    const job = await Job.create({
      title,
      description,
      salary: Number(salary),
      jobType,
      experience: Number(experience),
      location,
      position,
      requirement: requirements.split(","),
      company: companyId,
      created_BY: userId,
    });
    return res.json({ msg: "Job is created Successfullly", job,success:true });
  } catch (error) {
    console.log(error);
  }
};

export const getAlljobgs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate("company created_BY")
    if (!jobs) {
      return res.json({ msg: "Job not found", success: false });
    }
    return res.json({ jobs, success: true });
  } catch (error) {}
};

export const jobByid = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({path:"application"});

    if (!job) {
      return res.json({ msg: "Job not found", success: false });
    }

    return res.json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_BY: adminId }).populate({path:"company"})

    if (!jobs) {
      return res.json({ msg: "Job not found",success:false });
    }
    res.json({ jobs, success: true });
  } catch (error) {
    console.log(error);
  }
}; 
