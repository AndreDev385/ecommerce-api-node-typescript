import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { InputProductDto } from '../dtos/product-dtos';
import { InputVariationDto } from '../dtos/variation-dtos';
import { Asset } from './asset';
import { Variation } from './variation';

export class Product {
  private readonly id: string;
  private name: string;
  private brandId: string;
  private categoryId: string;
  private description: string | null;
  private readonly tags: string[] = [];
  private asset: Asset | null;
  private readonly variations: Variation[] = [];

  constructor ({
    id,
    name,
    brandId,
    categoryId,
    description,
    tags,
    asset,
    variations
  }: InputProductDto) {
    this.id = id;
    this.setName(name);
    this.setBrandId(brandId);
    this.setCategoryId(categoryId);
    this.setDescription(description);
    if (tags) {
      for (const tag of tags) {
        this.addTags(tag);
      }
    }
    this.setAsset(asset);
    if (variations) {
      for (const variation of variations) {
        this.addVariation(variation);
      }
    }
  }

  setName (name: string): void {
    if (!typeCheck('String', name)) {
      throw new Error('Name should be a string');
    }
    this.name = name;
  }

  setBrandId (brand: string) {
    this.brandId = brand;
  }

  setCategoryId (category: string): void {
    this.categoryId = category;
  }

  setDescription (str?: string) {
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

  setAsset (asset?: Asset): void {
    if (asset == null) {
      this.asset = null;
      return
    }
    this.asset = asset;
  }

  addVariation (variation: Variation): void {
    this.variations.push(variation);
  }

  getData () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      categoryId: this.categoryId,
      brandId: this.brandId,
      asset: this.asset,
      variations: this.variations,
      tags: this.tags
    };
  }
}
