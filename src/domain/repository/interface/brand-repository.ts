import { Brand, CreateBrand, UpdateBrand } from "../../entity/brand";

export interface BrandRepository {
  create(brand: CreateBrand): Promise<Brand>;
  findAll(): Promise<Brand[]>;
  findById(id: number): Promise<Brand>;
  findByName(name: string): Promise<Brand>;
  update(id: number, data: UpdateBrand): Promise<Brand>;
  delete(id: number): Promise<void>;
}
