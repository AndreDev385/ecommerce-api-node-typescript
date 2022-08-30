import { createBrandSchema } from "../schemas/brand.schema";
import { Asset } from "./asset";
import { Product } from "./product";

export class Brand {
  id: number;
  name: string;
  description: string;
  asset: Asset;
  products: Product[]

  static validateCreateBrand(data: CreateBrandDTO) {
    const { error } = createBrandSchema.validate(data, { abortEarly: false });
    if (error) throw error;
  }

  static validateUpdateBrand(data: UpdateBrandDTO) {
    const { error } = createBrandSchema.validate(data, { abortEarly: false });
    if (error) throw error;
  }
}

export interface CreateBrandDTO {
  name: string;
  description?: string;
  asset?: Asset;
}

export interface UpdateBrandDTO {
  name?: string;
  description?: string;
  asset?: Asset;
}

export class ReadBrandDTO {
  id: number;
  name: string;
  description: string;
  products: Product[]
  asset: Asset | null;

  constructor(id: number, name: string, description:string, products: Product[], asset: Asset | null){
    this.id = id
    this.name = name
    this.description = description
    this.products = products
    this.asset = asset
  } 
}