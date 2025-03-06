import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        maxlength: 250
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Producto = mongoose.model('Producto', ProductoSchema);