import express from "express";
import {
  getLoans,
  getExpiredLoans,
  getLoansByEmail,
  deleteLoanById
} from "../controllers/loanController.js";
import { auth, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/loans", auth, getLoans);
router.get("/loans/expired", auth, getExpiredLoans);
router.get(
  "/loans/:userEmail/get",
  auth,
  getLoansByEmail
);
router.delete(
  "/loan/:id/delete",
  auth,
  checkRole("superAdmin"),
  deleteLoanById
);


export default router;
