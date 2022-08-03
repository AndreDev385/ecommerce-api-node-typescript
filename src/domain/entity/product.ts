import { Asset } from "./asset";
import { Brand } from "./brand";
import { Category } from "./category";
import { Variation } from "./variation";

export class Product {
  id: number;
  name: string;
  brand: Brand;
  coverImage: Asset | null;
  category: Category;
  description: string;
  variations: Variation[];
  tags: string[];

  constructor(
    id: number,
    name: string,
    brand: Brand,
    coverImage: Asset | null = null,
    category: Category,
    description: string,
    variations: Variation[] = [],
    tags: string[] = []
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.coverImage = coverImage;
    this.category = category;
    this.description = description;
    this.variations = variations;
    this.tags = tags;
  }
}

export interface CreateProduct {
  name: string;
  brand: Brand;
  coverImage?: Asset;
  category: Category;
  description?: string;
  variations?: Variation[];
  tags?: string[];
}
