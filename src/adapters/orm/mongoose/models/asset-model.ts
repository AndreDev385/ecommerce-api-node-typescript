import { Schema, model } from 'mongoose';

const assetSchema = new Schema({
  id: { type: String, required: true },
  originalUrl: { type: String, required: true },
  optimizedUrl: String
})

export const AssetModel = model('Asset', assetSchema);
