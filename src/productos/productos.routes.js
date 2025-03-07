import { Router } from "express";
import { createProduct, editProduct, deleteProduct, getProducts, getTopSellingProducts, searchProductsByName, getProductsByCategory } from "./productos.controller.js";
import { crearProductoValidator, editarProductoValidator, eliminarProductoValidator } from "../middlewares/productos-validator.js";
import { isAdmin } from "../middlewares/validate-admin-jwt.js";

const router = Router();

/**
 * @swagger
 * /productos/createProduct:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - precio
 *               - stock
 *               - categoria
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *               stock:
 *                 type: integer
 *                 description: Stock del producto
 *               categoria:
 *                 type: string
 *                 description: Categoría del producto
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post("/createProduct", [isAdmin, crearProductoValidator], createProduct);

/**
 * @swagger
 * /productos/editProduct/{id}:
 *   put:
 *     summary: Editar un producto existente
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *               stock:
 *                 type: integer
 *                 description: Stock del producto
 *               categoria:
 *                 type: string
 *                 description: Categoría del producto
 *     responses:
 *       200:
 *         description: Producto editado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.put("/editProduct/:id", [isAdmin, editarProductoValidator], editProduct);

/**
 * @swagger
 * /productos/deleteProduct/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.delete("/deleteProduct/:id", [isAdmin, eliminarProductoValidator], deleteProduct);

/**
 * @swagger
 * /productos/getProducts:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *       400:
 *         description: Error en la solicitud
 */
router.get("/getProducts", getProducts);

/**
 * @swagger
 * /productos/topSelling:
 *   get:
 *     summary: Obtener los productos más vendidos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos
 *       400:
 *         description: Error en la solicitud
 */
router.get("/topSelling", getTopSellingProducts);

/**
 * @swagger
 * /productos/searchByName:
 *   get:
 *     summary: Buscar productos por nombre
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del producto
 *     responses:
 *       200:
 *         description: Lista de productos encontrados
 *       400:
 *         description: Error en la solicitud
 */
router.get("/searchByName", searchProductsByName);

/**
 * @swagger
 * /productos/categoria/{categoriaId}:
 *   get:
 *     summary: Obtener productos por categoría
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: categoriaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Lista de productos en la categoría
 *       400:
 *         description: Error en la solicitud
 */
router.get("/categoria/:categoriaId", getProductsByCategory);

export default router;