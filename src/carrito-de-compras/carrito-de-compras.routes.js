import { Router } from 'express';
import { addProductToCart, removeProductFromCart, getCartProducts, completePurchase, generatebill, getBillHistory } from './carrito-de-compras.controller.js';
import { addProductToCartValidator, removeProductFromCartValidator, getCartProductsValidator, completePurchaseValidator } from '../middlewares/carrito-de-compras.validator.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

/**
 * @swagger
 * /carrito/addProduct:
 *   post:
 *     summary: Añadir un producto al carrito
 *     tags: [Carrito de Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del producto
 *     responses:
 *       200:
 *         description: Producto añadido al carrito
 *       400:
 *         description: Error en la solicitud
 */
router.post('/addProduct', validarJWT, addProductToCartValidator, addProductToCart);

/**
 * @swagger
 * /carrito/removeProduct:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [Carrito de Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *       400:
 *         description: Error en la solicitud
 */
router.delete('/removeProduct', validarJWT, removeProductFromCartValidator, removeProductFromCart);

/**
 * @swagger
 * /carrito/getCartProducts:
 *   get:
 *     summary: Obtener los productos del carrito
 *     tags: [Carrito de Compras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos en el carrito
 *       400:
 *         description: Error en la solicitud
 */
router.get('/getCartProducts', validarJWT, getCartProductsValidator, getCartProducts);

/**
 * @swagger
 * /carrito/completePurchase:
 *   post:
 *     summary: Completar la compra
 *     tags: [Carrito de Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethod
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 description: Método de pago
 *     responses:
 *       200:
 *         description: Compra completada
 *       400:
 *         description: Error en la solicitud
 */
router.post('/completePurchase', validarJWT, completePurchaseValidator, completePurchase);

/**
 * @swagger
 * /carrito/generate-bill/{purchaseId}:
 *   get:
 *     summary: Generar factura de la compra
 *     tags: [Carrito de Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: purchaseId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la compra
 *     responses:
 *       200:
 *         description: Factura generada
 *       400:
 *         description: Error en la solicitud
 */
router.get('/generate-bill/:purchaseId', validarJWT, generatebill);

/**
 * @swagger
 * /carrito/bill-history/{userId}:
 *   get:
 *     summary: Obtener historial de facturas del usuario
 *     tags: [Carrito de Compras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Historial de facturas
 *       400:
 *         description: Error en la solicitud
 */
router.get('/bill-history/:userId', validarJWT, getBillHistory);

export default router;