import { Router } from "express";
import { createProduct, editProduct, deleteProduct, getProducts, getTopSellingProducts, searchProductsByName, getProductsByCategory } from "./productos.controller.js";
import { crearProductoValidator, editarProductoValidator, eliminarProductoValidator } from "../middlewares/productos-validator.js";
import { isAdmin } from "../middlewares/validate-admin-jwt.js";

const router = Router();

router.post("/createProduct", [isAdmin, crearProductoValidator], createProduct);

router.put("/editProduct/:id", [isAdmin, editarProductoValidator], editProduct);

router.delete("/deleteProduct/:id", [isAdmin, eliminarProductoValidator], deleteProduct);

router.get("/getProducts", getProducts);

router.get("/topSelling", getTopSellingProducts);

router.get("/searchByName", searchProductsByName);

router.get("/categoria/:categoriaId", getProductsByCategory);

export default router;