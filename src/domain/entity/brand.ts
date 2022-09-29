import { Asset } from './asset';
import { Product } from './product';
import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { InputBrandDto } from '../dtos/brand-dtos';
import { slugify } from '../utils/slugify';

export class Brand {
  private readonly id: string;
  private name: string;
  private slug: string;
  private description: string | null;
  private asset: Asset | null;
  private readonly products: Product[] = [];

  constructor ({ id, name, description, asset, products }: InputBrandDto) {
    console.log(name, description, asset, products, 'Data');
    this.id = id;
    this.setName(name);
    this.setSlug(name);
    this.setDescription(description);
    this.setAsset(asset);
    if (products) {
      for (const product of products) {
        this.addProduct(product);
      }
    }
  }

  setName (name: string): void {
    if (!name) {
      throw new Error('Name is required');
    }
    if (!typeCheck('String', name)) {
      throw new Error('Name should be a string');
    }
    if (name.length < 4) {
      throw new Error('Name should have at least 4 characters');
    }
    this.name = name;
  }

  setSlug (slug: string): void {
    if (!typeCheck('String', slug)) {
      throw new Error('Slug should be a string');
    }
    this.slug = slugify.convert(slug);
  }

  setDescription (description: string): void {
    if (!description) {
      this.description = null;
      return
    }
    if (!typeCheck('String', description)) {
      throw new Error('Description should be a string');
    }
    this.description = description;
  }

  setAsset (asset: Asset): void {
    if (!asset) {
      this.asset = null;
      return
    }
    this.asset = asset;
  }

  addProduct (product: Product): void {
    this.products.push(product);
  }

  getData () {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      asset: this.asset,
      products: this.products
    };
  }
}
