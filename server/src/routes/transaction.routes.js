import { Router } from "express";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../controllers/transaction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createTransaction);
router.route("/").get(verifyJWT, getTransactions);
router.route("/:id").delete(verifyJWT, deleteTransaction);

export default router;
