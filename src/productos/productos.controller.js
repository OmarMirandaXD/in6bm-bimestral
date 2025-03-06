import { Producto } from "./productos.model.js";

export const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria } = req.body;

        const newProduct = new Producto({ nombre, descripcion, precio, stock, categoria });
        await newProduct.save();

        res.status(201).json({
            success: true,
            msg: 'Product created',
            product: newProduct,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error creating product',
            error: err.message
        });
    }
};

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedProduct = await Producto.findByIdAndUpdate(id, data, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                msg: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Product updated',
            product: updatedProduct,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error updating product',
            error: err.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Producto.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                msg: "Product not found"
            });
        }

        await Producto.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: 'Product deleted'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error deleting product',
            error: err.message
        });
    }
};

export const getProducts = async (_req, res) => {
    try {
        const products = await Producto.find();

        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error getting products',
            error: err.message
        });
    }
};

export const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Producto.find().sort({ ventas: -1 }).limit(10);
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error getting top selling products",
            error: err.message
        });
    }
};

export const searchProductsByName = async (req, res) => {
    try {
        const { nombre } = req.query;
        const products = await Producto.find({ nombre: new RegExp(nombre, 'i') }).populate('categoria');
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error searching products by name",
            error: err.message
        });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoriaId } = req.params;
        const products = await Producto.find({ categoria: categoriaId }).populate('categoria');
        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Error getting products by category",
            error: err.message
        });
    }
};