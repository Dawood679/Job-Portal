import express from 'express'
const router = express.Router()
import { register,login,logout, updataProfile } from '../controllers/userRegistrations.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { singleUpload } from '../middleware/multer.js'




router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated,singleUpload,updataProfile)

export default router