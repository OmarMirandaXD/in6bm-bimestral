import { Router } from 'express';
import { addProductToCart, removeProductFromCart, getCartProducts, completePurchase, generatebill, getBillHistory } from './carrito-de-compras.controller.js';
import { addProductToCartValidator, removeProductFromCartValidator, getCartProductsValidator, completePurchaseValidator } from '../middlewares/carrito-de-compras.validator.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post('/addProduct', validarJWT, addProductToCartValidator, addProductToCart);
router.delete('/removeProduct', validarJWT, removeProductFromCartValidator, removeProductFromCart);
router.get('/getCartProducts', validarJWT, getCartProductsValidator, getCartProducts);
router.post('/completePurchase', validarJWT, completePurchaseValidator, completePurchase);
router.get('/generate-bill/:purchaseId', validarJWT, generatebill);
router.get('/bill-history/:userId', validarJWT, getBillHistory);

export default router;