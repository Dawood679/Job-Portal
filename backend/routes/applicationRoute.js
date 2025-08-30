import express from "express";
const router = express.Router();

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { applyjob, getApplcant, getAppliedJob, updatestatus } from "../controllers/application.js";


router.route("/apply/:id").get(isAuthenticated,applyjob)
router.route("/get").get(isAuthenticated,getAppliedJob)
router.route("/:id/applicant").get(isAuthenticated,getApplcant)
router.route("/status/:id/update").post(isAuthenticated,updatestatus)

export default router;
