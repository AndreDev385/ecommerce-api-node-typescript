import { Brand, CreateBrand } from "../../entity/brand";

export interface BrandRepository {
  create(brand: CreateBrand): Promise<Brand>;
  findAll(): Promise<Brand[]>;
}
