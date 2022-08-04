import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";
import { Asset } from "./asset";
import { Product } from "./product";

export class Category {
  id: number;
  name: string;
  slug: string;
  title?: string;
  description?: string;
  tags: Array<string>;
  products?: Product[];

  static validateCreateCategory(category: CreateCategory) {
    const { error } = createCategorySchema.validate(category, {
      abortEarly: false,
    });
    if (error) throw error;
  }

  static validateUpdateCategory(data: UpdateCategory) {
    const { error } = updateCategorySchema.validate(data, {
      abortEarly: false,
    });
    if (error) throw error;
  }
}

export interface CreateCategory {
  name: string;
  slug: string;
  title?: string;
  description?: string;
  tags?: Array<string>;
}

export interface UpdateCategory {
  name?: string;
  slug?: string;
  title?: string;
  description?: string;
  tags?: Array<string>;
}
