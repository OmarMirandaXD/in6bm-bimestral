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