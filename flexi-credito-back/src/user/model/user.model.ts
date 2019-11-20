import { Schema, Document } from 'mongoose';


export const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        required: true
    },
    type_user: {
        type: String,
        enum: ['Administrador', 'Cliente', 'Inversor', 'Convenio']
    },
    status: {
        type: Boolean,
        default: false  
    },
    is_approved: {
        type: Boolean,
        required: false
    },
    user_id: {
        type: String,
        required: false
    }
})

export interface IUser extends Document {
    email: string,
    password: string,
    identification: string,
    type_user: string,
    status: boolean,
    is_approved ?: boolean,
    user_id ?: string
}