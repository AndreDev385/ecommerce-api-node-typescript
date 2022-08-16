import { createProductSchema, UpdateProductSchema } from "../schemas/product.schema";
import { Asset } from "./asset";
import { Brand } from "./brand";
import { Category } from "./category";
import { Variation } from "./variation";

export class Product {
  id: number;
  name: string;
  brandId: number;
  categoryId: number;
  description: string;
  tags: string[];

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
