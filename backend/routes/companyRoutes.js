import express from "express";
const router = express.Router();

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateComapny,
} from "../controllers/company.js";
import { singleUpload } from "../middleware/multer.js";

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateComapny);

export default router;
