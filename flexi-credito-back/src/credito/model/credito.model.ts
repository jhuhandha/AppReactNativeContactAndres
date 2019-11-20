import { Schema, Document } from 'mongoose';

export const creditSchema = new Schema({
    name_product: {
        type: String,
        required: true
    },
    product_value:{
        type: Number,
        required: true
    },
    application_date: {
        type: Date,
        default: Date.now
    },
    convention_id: {
        type: String,
        required: true
    },
    owner_id: {
        type: Schema.ObjectId, 
        ref: 'User'
    },
    credit_id: {
        type: String,
        required: false
    },
    user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    }
})

export const creditStatus = new Schema({
    credit_id: {
        type: Schema.ObjectId,
        ref: 'Credit'
    },
    status:{
        type: String,
        enum: ['Pendiente aprobación', 'Aprobado', 'Aprobado cliente', 'En progeso', 'Finalizado', 'Cancelado', 'Rechazado']
    },
    date: {
        type: Date,
        default: Date.now
    }
})