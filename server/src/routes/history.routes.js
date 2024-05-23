import { Router } from "express";
import {
  createHistory,
  getHistory,
} from "../controllers/history.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createHistory);
router.route("/").get(verifyJWT, getHistory);

export default router;
