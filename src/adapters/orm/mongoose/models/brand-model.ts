import { Schema, model } from 'mongoose';

const brandSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: null },
    asset: { type: String, ref: 'Asset', default: null },
    products: [{ type: String, ref: 'Product', default: [] }],
});

export const BrandModel = model('Brand', brandSchema);
