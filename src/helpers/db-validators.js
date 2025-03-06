import User from "../usuarios/usuario.model.js";
import { Producto } from "../productos/productos.model.js";
import Categoria from "../categorias/categorias.model.js";

export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
};

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({ username });
    if (existe) {
        throw new Error(`El nombre de usuario ${username} ya está registrado`);
    }
};

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid);
    if (!existe) {
        throw new Error("No existe el usuario con el ID proporcionado");
    }
};

export const productoExists = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto con ID ${id} no existe`);
    }
};

export const categoriaExists = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoría con ID ${id} no existe`);
    }
};