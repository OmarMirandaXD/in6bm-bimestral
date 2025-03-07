import { CarritoDeCompras } from './carrito-de-compras.model.js';
import { Compra } from '../CompraFinalizada/compra.model.js';
import { validateCreditCard } from '../helpers/credit-cart-validator.js'; 

export const addProductToCart = async (req, res) => {
    try {
        const { productoId, cantidad } = req.body;

        let cart = await CarritoDeCompras.findOne();

        if (!cart) {
            cart = new CarritoDeCompras({ productos: [] });
        }

        const existingProduct = cart.productos.find(item => item.producto.toString() === productoId);

        if (existingProduct) {
            existingProduct.cantidad += cantidad;
        } else {
            cart.productos.push({ producto: productoId, cantidad });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            msg: 'Product added to cart',
            cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error adding product to cart',
            error: err.message
        });
    }
};

export const removeProductFromCart = async (req, res) => {
    try {
        const { productoId } = req.body;

        const cart = await CarritoDeCompras.findOne();

        if (!cart) {
            return res.status(404).json({
                success: false,
                msg: 'Cart not found'
            });
        }

        cart.productos = cart.productos.filter(item => item.producto.toString() !== productoId);

        await cart.save();

        res.status(200).json({
            success: true,
            msg: 'Product removed from cart',
            cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error removing product from cart',
            error: err.message
        });
    }
};

export const getCartProducts = async (req, res) => {
    try {
        const cart = await CarritoDeCompras.findOne().populate('productos.producto');

        if (!cart) {
            return res.status(404).json({
                success: false,
                msg: 'Cart not found'
            });
        }

        res.status(200).json({
            success: true,
            productos: cart.productos
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error getting cart products',
            error: err.message
        });
    }
};

export const completePurchase = async (req, res) => {
    try {
        const { metodoPago, numeroTarjeta, fechaVencimiento, cvv } = req.body; 
        const cart = await CarritoDeCompras.findOne().populate('productos.producto');

        if (!cart) {
            return res.status(404).json({
                success: false,
                msg: 'Cart not found'
            });
        }

        
        const tarjetaValida = validateCreditCard(numeroTarjeta, fechaVencimiento, cvv);
        if (!tarjetaValida) {
            return res.status(400).json({
                success: false,
                msg: 'Invalid credit card details'
            });
        }

        let total = 0;
        for (const item of cart.productos) {
            const product = item.producto;
            if (product.stock < item.cantidad) {
                return res.status(400).json({
                    success: false,
                    msg: `Stock insuficiente para el producto ${product.nombre}`
                });
            }
            product.stock -= item.cantidad;
            await product.save();
            total += product.precio * item.cantidad;
        }

        const newPurchase = new Compra({
            productos: cart.productos,
            total,
            metodoPago,
            numeroTarjeta,
            fechaVencimiento,
            cvv,
            usuario: req.usuario ? req.usuario._id : null 
        });
        await newPurchase.save();

        cart.productos = [];
        await cart.save();

        res.status(200).json({
            success: true,
            msg: 'Pago completado',
            purchase: newPurchase
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error completing purchase',
            error: err.message
        });
    }
};