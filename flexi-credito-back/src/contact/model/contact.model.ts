import { Schema, Document } from 'mongoose';

export const contactSchema = new Schema({
    identification: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

export interface IContact extends Document {
    identification: string;
    name: string;
    surname: string;
    img: string;
}