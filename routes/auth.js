import express from "express";
import { authLogout, authLogin, getUsers } from "../controllers/authController.js";


const router = express.Router();

router.post("/login", authLogin);
router.delete("/logout", authLogout);
router.get("/users",getUsers);


export default router;