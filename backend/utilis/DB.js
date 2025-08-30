import mongoose, { mongo } from "mongoose";


async function connectDb(){
    await mongoose.connect(process.env.MONOG_DB).then(()=>console.log("Db is connected")).catch(()=>console.log("Error in DB"))
}

export default connectDb