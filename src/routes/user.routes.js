import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();// ye router banayega express ka

router.route("/register").post(registerUser);

export default router;

// inko app.js me import karna hai aur use karna hai