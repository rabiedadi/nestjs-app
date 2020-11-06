import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    mage: String,
    price: Number,
    creted: {
        type: Date,
        default: Date.now
    }
})