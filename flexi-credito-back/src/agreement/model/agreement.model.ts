import { Schema, Document } from 'mongoose';

export const agreementSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description:{
        type: String,
        required: true,
        index: true
    },
    image: {
        type: String,
        required: false,
    },
    address: {
        type: [String],
        required: true,
        index: true
    },
    phones:{
        type: [String],
        required: true,
        index: true
    },
    owner: {
        type: Schema.ObjectId, 
        ref: 'User'
    }
})

export interface IAgreement extends Document {
    name: string,
    description: string,
    phones: string[],
    address: string[],
    owner: string,
}