import mongoose from 'mongoose';

const CompraSchema = new mongoose.Schema({
    productos: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    metodoPago: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Compra = mongoose.model('Compra', CompraSchema);