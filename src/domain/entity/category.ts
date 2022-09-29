import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { CreateCategoryDTO } from '../dtos/category.dtos';
import { slugify } from '../utils/slugify';

import { Asset } from './asset';
import { Product } from './product';

export class Category {
  private readonly id: string;
  private name: string;
  private slug: string;
  private description: string | null;
  private readonly tags: string[] = [];
  private readonly products: Product[] = [];
  private asset: Asset | null;

  constructor ({ id, name, description, asset, tags, products }: CreateCategoryDTO) {
    this.id = id;
    this.setName(name);
    this.setDescription(description);
    this.setSlug(this.name);
    this.setAsset(asset);
    if (tags) {
      for (const tag of tags) {
        this.addTags(tag);
      }
    }
    if (products) {
      for (const product of products) {
        this.addProducts(product);
      }
    }
  }

  setName (name: string): void {
    if (!typeCheck('String', name)) {
      throw new Error('Name should be a string');
    }
    if (name.length < 3) {
      throw new Error('Name should have at least 3 characters');
    }
    this.name = name;
  }

  setSlug (slug: string): void {
    if (!typeCheck('String', slug)) {
      throw new Error('Slug should be a string');
    }
    this.slug = slugify.convert(slug);
  }

  setDescription (str?: string): void {
    if (!str) {
      this.description = null;
      return
    }
    if (!typeCheck('String', str)) {
      throw new Error('Description should be a string');
    }
    this.description = str;
  }

  addTags (tag: string): void {
    if (!typeCheck('String', tag)) {
      throw new Error('Tag should be a string');
    }
    this.tags.push(tag);
  }

  addProducts (product: Product): void {
    this.products.push(product);
  }

  setAsset (asset?: Asset): void {
    if (asset == null) {
      this.asset = null;
      return
    }
    this.asset = asset;
  }

  getData () {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      asset: this.asset,
      tags: this.tags,
      products: this.products
    };
  }
}
