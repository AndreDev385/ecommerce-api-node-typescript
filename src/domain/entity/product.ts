import {
  createProductSchema,
  UpdateProductSchema,
} from "../schemas/product.schema";
import { Asset, ReadAssetDTO } from "./asset";
import { Brand } from "./brand";
import { Category } from "./category";
import { ReadVariationDTO, Variation } from "./variation";

export class Product {
  id: number;
  name: string;
  brandId: number;
  categoryId: number;
  description: string;
  tags: string[];
  asset: Asset | null;
  variations: Variation[];

  constructor(
    id: number,
    name: string,
    brandId: number,
    categoryId: number,
    description: string,
    tags: string[]
  ) {
    this.id = id;
    this.name = name;
    this.brandId = brandId;
    this.categoryId = categoryId;
    this.description = description;
    this.tags = tags;
  }

  static validateCreateProduct(data: CreateProduct) {
    const { error } = createProductSchema.validate(data, { abortEarly: false });
    if (error) throw error;
  }
  static validateUpdateProduct(data: UpdateProduct) {
    const { error } = UpdateProductSchema.validate(data, { abortEarly: false });
    if (error) throw error;
  }
}

export interface CreateProduct {
  name: string;
  brandId: number;
  categoryId: number;
  description?: string;
  tags?: string[];
}

export interface UpdateProduct {
  name?: string;
  brand?: Brand;
  description?: string;
  tags?: string[];
}

export class ReadProductDTO {
  id: number;
  name: string;
  brandId: number;
  categoryId: number;
  description: string;
  tags: string[];
  asset: ReadAssetDTO | null;
  variations: ReadVariationDTO[];

  constructor(
    id: number,
    name: string,
    brandId: number,
    categoryId: number,
    description: string,
    tags: string[],
    asset: ReadAssetDTO | null,
    variations: ReadVariationDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.brandId = brandId;
    this.categoryId = categoryId;
    this.description = description;
    this.tags = tags;
    this.asset = asset;
    this.variations = variations;
  }
}
