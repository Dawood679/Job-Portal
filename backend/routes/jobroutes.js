import express from "express";
const router = express.Router();

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  getAdminJob,
  getAlljobgs,
  jobByid,
  postjob,
} from "../controllers/job.js";

router.route("/post").post(isAuthenticated, postjob);
router.route("/get").get(isAuthenticated, getAlljobgs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJob);
router.route("/get/:id").get(isAuthenticated, jobByid);
export default router;
