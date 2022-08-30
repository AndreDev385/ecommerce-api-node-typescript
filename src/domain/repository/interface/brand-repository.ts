import {
  Brand,
  CreateBrandDTO,
  ReadBrandDTO,
  UpdateBrandDTO,
} from "../../entity/brand";

export interface BrandRepository {
  create(brand: CreateBrandDTO): Promise<Brand>;
  findAll(): Promise<Brand[]>;
  findById(id: number): Promise<Brand>;
  findByName(name: string): Promise<Brand>;
  update(id: number, data: UpdateBrandDTO): Promise<Brand>;
  delete(id: number): Promise<void>;
}
