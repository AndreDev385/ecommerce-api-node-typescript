import { Asset } from '../entity/asset';
import { Product } from '../entity/product';

export interface InputBrandDto {
  name: string
  id: string
  slug: string
  description: string
  asset: Asset
  products: Product[]
}

export class OutputBrandDto {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  products: Product[]
  asset: Asset | null;

  constructor ({ id, name, slug, description, products, asset }: InputBrandDto) {
    this.id = id;
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.products = products;
    this.asset = asset;
  }
}
