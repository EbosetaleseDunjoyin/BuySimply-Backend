import express from "express";
import {
  getLoans
} from "../controllers/loanController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/loans", getLoans);


export default router;
