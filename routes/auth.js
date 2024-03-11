import express from "express";
import { authLogout, authLogin, getUsers } from "../controllers/authController.js";
import { auth } from "../middleware/authMiddleware.js"


const router = express.Router();

router.post("/login", authLogin);
router.post("/logout", auth, authLogout);
router.get("/users",getUsers);


export default router;