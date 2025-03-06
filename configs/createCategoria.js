import Categoria from '../src/categorias/categorias.model.js';

export const createDefaultCategoria = async () => {
    try {
        const categoriaExists = await Categoria.findOne({ nombre: "Categoría Predeterminada" });
        if (!categoriaExists) {
            const categoriaData = {
                nombre: "Categoría Predeterminada",
                descripcion: "Esta es la categoría predeterminada"
            };
            await Categoria.create(categoriaData);
            console.log("Categoría predeterminada creada exitosamente");
        } else {
            console.log("La Categoría predeterminada ya existe");
        }
    } catch (err) {
        console.error("Error al crear la categoría predeterminada:", err);
    }
};