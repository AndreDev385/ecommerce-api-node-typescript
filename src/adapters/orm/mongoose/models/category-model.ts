import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: null },
    slug: { type: String, required: true },
    tags: [{ type: String, default: [] }],
    asset: { type: String, ref: 'Asset', default: null },
    products: [{ type: String, ref: 'Product', default: [] }],
});

export const CategoryModel = model('Category', categorySchema);
