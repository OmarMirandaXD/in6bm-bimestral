import { Router } from "express";
import { getUserById, getUsers, updatePassword, updateUser, deleteUser } from "./usuario.controller.js";
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/usuario-validator.js";
import { isAdmin } from "../middlewares/validate-admin-jwt.js";

const router = Router();

/**
 * @swagger
 * /usuario/findUser/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get("/", getUsers);

/**
 * @swagger
 * /usuario/updatePassword/{uid}:
 *   put:
 *     summary: Actualizar la contraseña de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       500:
 *         description: Error al actualizar la contraseña
 */
router.put("/updatePassword/:uid", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /usuario/updateUser/{uid}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               role:
 *                 type: string
 *                 description: Rol del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *       500:
 *         description: Error al actualizar el usuario
 */
router.put("/updateUser/:uid", updateUserValidator, isAdmin, updateUser);

/**
 * @swagger
 * /usuario/deleteUser/{uid}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       403:
 *         description: No tienes permisos para realizar esta acción
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete("/deleteUser/:uid", isAdmin, deleteUser);

export default router;