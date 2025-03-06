import { Router } from 'express';
import { addProductToCart, removeProductFromCart, getCartProducts, completePurchase } from './carrito-de-compras.controller.js';
import { addProductToCartValidator, removeProductFromCartValidator, getCartProductsValidator } from '../middlewares/carrito-de-compras.validator.js';

const router = Router();

router.post('/addProduct', addProductToCartValidator, addProductToCart);
router.delete('/removeProduct', removeProductFromCartValidator, removeProductFromCart);
router.get('/getCartProducts', getCartProductsValidator, getCartProducts);
router.post('/completePurchase', completePurchase);

export default router;