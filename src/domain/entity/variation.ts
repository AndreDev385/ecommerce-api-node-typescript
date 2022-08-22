import { createVariationSchema } from "../schemas/variation.schema";
import { Asset } from "./asset";

export type Attribute = {
  name: string;
  value: string;
};

export class Variation {
  id: number;
  productId: number;
  images?: number[];
  attributes: Array<Attribute>;
  normalPrice: number;
  offerPrice: number;
  stock: number;
  isAvaible?: boolean;
  isActive?: boolean
  Order_Variations?: { quantity: number; };

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
  isActive?: boolean
}

export interface UpdateVariation {
  productId?: number;
  images?: number[];
  attributes?: Attribute[];
  normalPrice: number;
  offerPrice?: number;
  stock?: number;
  isAvaible?: boolean;
  isActive?: boolean
}
