import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { InputVariationDto } from '../dtos/variation-dtos';
import { Asset } from './asset';

export interface Attribute {
  name: string;
  value: string;
}

export class Variation {
  id: string;
  productId: string;
  price: number;
  offerPrice: number | null;
  attributes: Attribute[];
  stock: number;
  isAvaible: boolean;
  assets: Asset[] = [];

  constructor({ id, productId, price, attributes, stock, assets, offerPrice }: InputVariationDto) {
    this.id = id;
    this.setProductId(productId);
    this.setPrice(price);
    this.setOfferPrice(offerPrice);
    this.setAttributes(attributes);
    this.setStock(stock);
    if (assets) {
      for (const a of assets) {
        this.addAsset(a);
      }
    }
  }

  private setProductId(str: string) {
    if (!str) {
      throw new Error('productId is required');
    }
    if (!typeCheck('String', str)) {
      throw new Error('productId should be a string');
    }
    this.productId = str;
  }

  setPrice(n: number): void {
    if (!n) {
      throw new Error('Price is required');
    }
    if (!typeCheck('Number', n)) {
      throw new Error('Price should be a number');
    }
    if (n <= 0) {
      throw new Error('Price should be greater than zero');
    }
    this.price = n;
  }

  setOfferPrice(n?: number): void {
    if (!n) {
      this.offerPrice = null;
      return;
    }
    if (!typeCheck('Number', n)) {
      throw new Error('Price should be a number');
    }
    if (n < 0) {
      throw new Error('Price should be greater than zero');
    }
    this.offerPrice = n;
  }

  setAttributes(arr: Attribute[]): void {
    if (arr.length < 1) {
      throw new Error('Insert some attributes');
    }
    this.attributes = arr;
  }

  private setIsAvaible(bool: boolean) {
    this.isAvaible = bool;
  }

  setStock(n: number): void {
    if (!n) {
      this.stock = 0;
      return;
    }
    if (!typeCheck('Number', n)) {
      throw new Error('Stock should be a number');
    }
    if (n < 0) {
      throw new Error('Stock should be positive');
    }
    this.stock = n;
    this.setIsAvaible(true);
    if (n === 0) {
      this.setIsAvaible(false);
    }
  }

  addAsset(asset: Asset) {
    this.assets.push(asset);
  }

  getData() {
    return {
      id: this.id,
      productId: this.productId,
      price: this.price,
      offerPrice: this.offerPrice,
      attributes: this.attributes,
      stock: this.stock,
      isAvaible: this.isAvaible,
      assets: this.assets,
    };
  }
}
