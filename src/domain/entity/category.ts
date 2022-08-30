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
  description: string;
  tags: Array<string>;
  products: Product[];
  asset: Asset | null

  static validateCreateCategory(category: CreateCategoryDTO) {
    const { error } = createCategorySchema.validate(category, {
      abortEarly: false,
    });
    if (error) throw error;
  }

  static validateUpdateCategory(data: UpdateCategoryDTO) {
    const { error } = updateCategorySchema.validate(data, {
      abortEarly: false,
    });
    if (error) throw error;
  }
}

export interface CreateCategoryDTO {
  name: string;
  slug: string;
  title?: string;
  description?: string;
  tags?: Array<string>;
}

export interface UpdateCategoryDTO {
  name?: string;
  slug?: string;
  title?: string;
  description?: string;
  tags?: Array<string>;
}

export class ReadCategoryDTO {
  id: number;
  name: string;
  slug: string;
  description: string;
  tags: Array<string>;
  products: Product[];
  asset: Asset | null;

  constructor(
    id: number,
    name: string,
    slug: string,
    description: string,
    tags: string[],
    products: Product[],
    asset: Asset | null
  ) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.tags = tags;
    this.products = products;
    this.asset = asset;
  }
}
