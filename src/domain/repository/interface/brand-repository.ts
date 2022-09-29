import { Brand } from '../../entity/brand';

export interface BrandRepository {
  create: (brand: Brand) => Promise<Brand>
  findAll: () => Promise<Brand[]>
  findByName: (name: string) => Promise<Brand | null>
  findById: (id: string) => Promise<Brand | null>
  update: (brand: Brand) => Promise<Brand>
  delete: (id: string) => Promise<void>
}
