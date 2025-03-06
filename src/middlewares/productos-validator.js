import { body, param } from "express-validator";
import { validarCampos } from "./validate-campos.js";
import { handleErrors } from "./handle-error.js";
import { validarJWT } from "./validar-jwt.js";
import { productoExists, categoriaExists } from "../helpers/db-validators.js";

export const crearProductoValidator = [
    validarJWT,
    body("nombre").notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("nombre").isLength({ max: 50 }).withMessage("El nombre del producto no puede exceder los 50 caracteres"),
    body("descripcion").optional().isLength({ max: 250 }).withMessage("La descripción no puede exceder los 250 caracteres"),
    body("precio").isFloat({ gt: 0 }).withMessage("El precio debe ser un número positivo"),
    body("stock").isInt({ gt: 0 }).withMessage("El stock debe ser un número entero positivo"),
    body("categoria").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("categoria").custom(categoriaExists),
    validarCampos,
    handleErrors
];

export const editarProductoValidator = [
    validarJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productoExists),
    body("nombre").optional().notEmpty().withMessage("El nombre del producto no puede estar vacío"),
    body("nombre").isLength({ max: 50 }).withMessage("El nombre del producto no puede exceder los 50 caracteres"),
    body("descripcion").optional().isLength({ max: 250 }).withMessage("La descripción no puede exceder los 250 caracteres"),
    body("precio").optional().isFloat({ gt: 0 }).withMessage("El precio debe ser un número positivo"),
    body("stock").optional().isInt({ gt: 0 }).withMessage("El stock debe ser un número entero positivo"),
    body("categoria").optional().isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("categoria").optional().custom(categoriaExists),
    validarCampos,
    handleErrors
];

export const eliminarProductoValidator = [
    validarJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productoExists),
    validarCampos,
    handleErrors
];

export const buscarProductoPorNombreValidator = [
    body("nombre").notEmpty().withMessage("El nombre del producto es obligatorio"),
    validarCampos,
    handleErrors
];

export const obtenerProductosPorCategoriaValidator = [
    param("categoriaId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("categoriaId").custom(categoriaExists),
    validarCampos,
    handleErrors
];