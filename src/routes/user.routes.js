import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = Router();
import {upload} from "../middlewares/multer.middleware.js"


// here in by using upload we are going to upload he image to cloudinary and there is middlerware you can chek that middleware 
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser);

export default router;
