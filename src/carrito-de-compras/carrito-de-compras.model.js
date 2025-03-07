import mongoose from 'mongoose';

const CarritoDeComprasSchema = new mongoose.Schema({
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
    }]
}, {
    versionKey: false,
    timestamps: true
});

export const CarritoDeCompras = mongoose.model('CarritoDeCompras', CarritoDeComprasSchema);