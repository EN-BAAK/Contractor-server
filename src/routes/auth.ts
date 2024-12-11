import express from "express";
import {
  getUser,
  login,
  logout,
  verifyToken,
} from "../controller/authController";
import {
  isAdmin,
  isAuthenticated,
  isResponser,
  isTester,
  loginValidation,
} from "../middleware/auth";
import { checkSchema } from "express-validator";
import { login as loginVerify } from "../middleware/verify";

const router = express.Router();

router.post("/login", checkSchema(loginVerify), loginValidation, login);
router.post("/logout", isAuthenticated, logout);

router.get("/verify", isAuthenticated, verifyToken);
router.get("/me", isAuthenticated, getUser);
router.get("/admin/verify", isAdmin, verifyToken);
router.get("/tester/verify", isTester, verifyToken);
router.get("/secrter/verify", isResponser, verifyToken);

export default router;
