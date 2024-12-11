import express from "express";
import { isResponser, isTester } from "../middleware/auth";
import { checkSchema } from "express-validator";
import { addRenew } from "../middleware/verify";
import { addReNewValidation } from "../middleware/contracts";
import {
  addReNews,
  deleteReNews,
  doneContract,
  editReNews,
  getRenews,
  selectDoneContracts,
  selectUnDoneContracts,
  unDoneContract,
} from "../controller/contractsController";

const router = express.Router();

router.post(
  "/add/renews",
  isResponser,
  checkSchema(addRenew),
  addReNewValidation,
  addReNews
);

router.get("/renews", isResponser, getRenews);
router.get("/done-contracts/:id", isTester, selectDoneContracts);
router.get("/undone-contracts/:id", isTester, selectUnDoneContracts);

router.put(
  "/edit/renews/:id",
  isResponser,
  checkSchema(addRenew),
  addReNewValidation,
  editReNews
);

router.put("/done-contracts/:id", isTester, doneContract);
router.put("/undone-contracts/:id", isTester, unDoneContract);

router.delete("/delete/renews/:id", isResponser, deleteReNews);

export default router;
