import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utilis/DB.js";
import userRouter from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobroutes.js";
import applicationRoutes from "./routes/applicationRoute.js";
dotenv.config({});
const app = express();

await connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes file is here to add
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job",jobRoutes)
app.use("/api/v1/application",applicationRoutes)

app.listen(process.env.PORT, () => {
  

  console.log("App is listning on this port 3000");
});
