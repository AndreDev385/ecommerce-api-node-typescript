import { Asset } from '../entity/asset';
import { Attribute } from '../entity/variation';
import { ReadAssetDTO } from './asset-dtos';

export interface InputVariationDto {
  id: string;
  productId: string;
  assets: Asset[];
  attributes: Attribute[];
  price: number;
  offerPrice?: number;
  stock: number;
}

export interface UpdateVariation {
  productId: number;
  images: number[];
  attributes: Attribute[];
  normalPrice: number;
  offerPrice: number;
  stock: number;
  isAvaible: boolean;
}

export class ReadVariationDTO {
  id: string;
  productId: string;
  assets: Asset[];
  attributes: Attribute[];
  price: number;
  offerPrice: number | null;
  stock: number;
  isAvaible: boolean;

  constructor(
    id: string,
    productId: string,
    normalPrice: number,
    offerPrice: number,
    stock: number,
    isAvaible: boolean,
    attributes: Attribute[],
    assets: Asset[]
  ) {
    this.id = id;
    this.productId = productId;
    this.price = normalPrice;
    this.offerPrice = offerPrice;
    this.stock = stock;
    this.isAvaible = isAvaible;
    this.attributes = attributes;
    this.assets = assets;
  }
}
