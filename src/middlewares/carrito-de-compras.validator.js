import { body } from "express-validator";
import { validarCampos } from "./validate-campos.js";
import { handleErrors } from "./handle-error.js";
import { productoExists } from "../helpers/db-validators.js";

export const addProductToCartValidator = [
    body("productoId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("productoId").custom(productoExists),
    body("cantidad").isInt({ gt: 0 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];

export const removeProductFromCartValidator = [
    body("productoId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("productoId").custom(productoExists),
    validarCampos,
    handleErrors
];

export const getCartProductsValidator = [
    validarCampos,
    handleErrors
];

export const completePurchaseValidator = [
    body("metodoPago").isString().withMessage("El método de pago es requerido"),
    body("numeroTarjeta").isCreditCard().withMessage("Número de tarjeta no válido"),
    body("fechaVencimiento").matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).withMessage("Fecha de vencimiento no válida"),
    body("cvv").isLength({ min: 3, max: 4 }).withMessage("CVV no válido"),
    validarCampos,
    handleErrors
];