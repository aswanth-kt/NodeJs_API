import { Router } from "express";
import { getCurrentUser, updatePassword, updateProfile, userLogin, userLogout, userRegister } from "../controllers/user.controller.js";


const router = Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/profile", getCurrentUser);

router.put("/update-profile", updateProfile);

router.patch("/update-password", updatePassword);

router.post("/logout", userLogout);


export default router;