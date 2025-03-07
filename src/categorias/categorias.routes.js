import { Router } from "express";
import { createCategory, editCategory, deleteCategory, getCategories } from "./categorias.controller.js";
import { categoriaValidator } from "../middlewares/categorias-validator.js";
import { isAdmin } from "../middlewares/validate-admin-jwt.js";

const router = Router();

/**
 * @swagger
 * /categorias/createCategory:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/createCategory", [isAdmin, categoriaValidator], createCategory);

/**
 * @swagger
 * /categorias/editCategory/{id}:
 *   put:
 *     summary: Editar una categoría existente
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoría editada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.put("/editCategory/:id", [isAdmin, categoriaValidator], editCategory);

/**
 * @swagger
 * /categorias/deleteCategory/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.delete("/deleteCategory/:id", isAdmin, deleteCategory);

/**
 * @swagger
 * /categorias/getCategories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       400:
 *         description: Error en la solicitud
 */
router.get("/getCategories", getCategories);

export default router;