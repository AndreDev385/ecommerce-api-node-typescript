import { updateAsset } from "../schemas/asset.schema";

export class Asset {
  id: number;
  owner: number;
  originalUrl: string;
  optimizedUrl?: string;
  variationId?: number;
  productId?: number;
  categoryId?: number;
  brandId?: number;

  static validateUpdateAsset(data: UpdateAsset) {
    const { error } = updateAsset.validate(data, { abortEarly: false });
    if (error) throw error;
  }
}

export interface CreateAsset {
  owner: number;
  originalUrl: string;
  optimizedUrl?: string;
  variationId?: number;
  productId?: number;
  categoryId?: number;
  brandId?: number;
}

export interface UpdateAsset {
  id: number;
  variarionId?: number;
  productId?: number;
  brandId?: number;
  categoryId?: number;
}
