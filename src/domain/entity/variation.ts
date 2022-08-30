import { createVariationSchema } from "../schemas/variation.schema";
import { Asset, ReadAssetDTO } from "./asset";

export class Attribute {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export class Variation {
  id: number;
  productId: number;
  assets: Asset[];
  attributes: Array<Attribute>;
  normalPrice: number;
  offerPrice: number;
  stock: number;
  isAvaible: boolean;
  isActive: boolean;
  Order_Variations?: { quantity: number };

  static validateCreateVariation(data: CreateVariation) {
    const { error } = createVariationSchema.validate(data, {
      abortEarly: false,
    });
    if (error) throw error;
  }

  static validateUpdateVariation(data: UpdateVariation) {
    const { error } = createVariationSchema.validate(data, {
      abortEarly: false,
    });
    if (error) throw error;
  }
}

export interface CreateVariation {
  productId: number;
  images?: number[];
  attributes?: Attribute[];
  normalPrice: number;
  offerPrice?: number;
  stock?: number;
  isAvaible?: boolean;
  isActive?: boolean;
}

export interface UpdateVariation {
  productId?: number;
  images?: number[];
  attributes?: Attribute[];
  normalPrice: number;
  offerPrice?: number;
  stock?: number;
  isAvaible?: boolean;
  isActive?: boolean;
}

export class ReadVariationDTO {
  id: number;
  productId: number;
  assets: ReadAssetDTO[];
  attributes: Attribute[];
  normalPrice: number;
  offerPrice: number;
  stock: number;
  isAvaible: boolean;
  Order_Variations:object

  constructor(
    id: number,
    productId: number,
    normalPrice: number,
    offerPrice: number,
    stock: number,
    isAvaible: boolean,
    attributes: Attribute[],
    assets: ReadAssetDTO[]
  ) {
    this.id = id;
    this.productId = productId;
    this.normalPrice = normalPrice;
    this.offerPrice = offerPrice;
    this.stock = stock;
    this.isAvaible = isAvaible;
    this.attributes = attributes;
    this.assets = assets;
    //this.Order_Variations = {}
  }
}
