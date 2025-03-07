import { Router } from "express";
import { getUserById, getUsers, updatePassword, updateUser, deleteUser } from "./usuario.controller.js";
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/usuario-validator.js";
import { isAdmin } from "../middlewares/validate-admin-jwt.js";

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);
router.get("/", getUsers);
router.put("/updatePassword/:uid", updatePasswordValidator, updatePassword);
router.put("/updateUser/:uid", updateUserValidator, isAdmin, updateUser);
router.delete("/deleteUser/:uid", isAdmin, deleteUser);

export default router;