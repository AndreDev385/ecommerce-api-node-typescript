import { createBrandSchema } from "../schemas/brand.schema";
import { Asset } from "./asset";

export class Brand {
  id: number;
  name: string;
  description?: string;
  image?: Asset;

  static validateCreateBrand(data: CreateBrand) {
    const { error } = createBrandSchema.validate(data, { abortEarly: false });
    if (error) throw error;
  }

  static validateUpdateBrand(data: UpdateBrand) {
    const { error } = createBrandSchema.validate(data, { abortEarly: false });
    if (error) throw error;
  }
}

export interface CreateBrand {
  name: string;
  description?: string;
  image?: Asset;
}

export interface UpdateBrand {
  name?: string;
  description?: string;
  image?: Asset;
}
