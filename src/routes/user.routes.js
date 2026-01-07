import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();// ye router banayega express ka

router.route("/register").post(
    upload.fields([
        {   name: "avatar", maxCount: 1 },
        {   name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

export default router;

// inko app.js me import karna hai aur use karna hai