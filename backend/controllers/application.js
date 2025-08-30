import {Application} from "../Models/applicationschema.js"
import {Job} from "../Models/jobSchema.js"

export const applyjob = async(req,res)=>{
    try {
        
        const userId = req.id
        const {id:jobId} = req.params

        if(!jobId){
            return res.json({msg:"Job id is required",success:false})
        }

        const existingapplication = await Application.findOne({job:jobId,applicant:userId})

        if(existingapplication){
            return res.json({msg:"You have already apply for this job",success:false})
        }
        const job = await Job.findById(jobId)
        if(!job){
            return res.json({msg:"job not found",success:false})
        }

        const newApplciation = await Application.create({
            job:jobId,
            applicant:userId
        })
        job.application.push(newApplciation._id)
        await job.save()

        return res.json({newApplciation,msg:"job appllied Successfully",success:true})
    } catch (error) {
        console.log(error)
    }
}



export  const getAppliedJob = async (req,res)=>{
    try {
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",

            }
        })

        if(!application){
            return res.json({msg:"No Aplication",success:false})
        }

        return res.json({application,success:true})
    } catch (error) {
        console.log(error)
    }
}



export const getApplcant = async (req,res)=>{
    try {
            const jobId = req.params.id
            const  job  = await Job.findById(jobId).populate({
                path:"application",
                options:{sort:{createdAt:-1}},
                populate:{
                    path:"applicant"
                }
            })

            if(!job){
                return res.json({msg:"JOb not found",success:false})
            }

            return res.json({job,success:true})
        
    } catch (error) {
        console.log(error)
        
    }
}


export const updatestatus = async (req,res)=>{
    try {
        const { status } = req.body;
        console.log(req.params.id,status)
        const applicationId  = req.params.id
        if(!status){
            return res.json({msg:"status is not found",success:false})
        }
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.json({msg:"Applciation not found",success:false})
        }
        application.status = status.toLowerCase();

        await application.save()

        return res.json({application,msg:"Status update SuccessFully",success:true})
    } catch (error) {
        console.log(error)

    }
}