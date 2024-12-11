import { Router } from "express";
import { isTesterAdmin } from "../middleware/auth";
import { getTestersFullNameID } from "../controller/mainTesterController";

const router = Router();

router.get("/testers", isTesterAdmin, getTestersFullNameID);

export default router;
