import express from "express";
import { isAdmin } from "../middleware/auth";
import {
  addContractsValidation,
  addUserValidation,
  editUser as editUserValidationMiddleware,
} from "../middleware/admin";
import {
  deleteContacts,
  addUser,
  deleteUser,
  editUser,
  addContracts,
  getUnFinishedContracts,
  getFinishedContracts,
  getUsers,
  deleteAllContacts,
  editContracts,
} from "../controller/adminController";
import { checkSchema } from "express-validator";
import { addNewUser } from "../middleware/verify";

const router = express.Router();

router.post(
  "/add/user",
  isAdmin,
  checkSchema(addNewUser),
  addUserValidation,
  addUser
);
router.post(
  "/add/contract/:testerId",
  isAdmin,
  addContractsValidation,
  addContracts
);

router.get("/users", isAdmin, getUsers);
router.get("/unfinished-contracts", isAdmin, getUnFinishedContracts);
router.get("/finished-contracts", isAdmin, getFinishedContracts);

router.put("/edit/user/:id", isAdmin, editUserValidationMiddleware, editUser);
router.put("/edit/contracts", isAdmin, editContracts);

router.delete("/delete/contract/:id", isAdmin, deleteContacts);
router.delete("/delete/contacts/all", isAdmin, deleteAllContacts);
router.delete("/delete/user/:id", isAdmin, deleteUser);



export default router;
