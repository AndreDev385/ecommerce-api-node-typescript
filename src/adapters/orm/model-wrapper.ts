import { FindOneBrandImpl } from '../../application/impl/brand/findone-brand-impl';
import { BrandModel } from './mongoose/models/brand-model';

export interface ModelWrapper {
  create: (document: object) => Promise<any>
  find: (filters: object) => Promise<any[]>
  get: (filters: object) => Promise<any>
  update: (filters: object, data: object, options?: object) => Promise<any>
  delete: (filters: object) => Promise<any>
}

export const brandDb: ModelWrapper = {
  create: async (document) => await BrandModel.create(document),
  find: async (filters) => await BrandModel.find(filters),
  get: async (filters) => await BrandModel.findById(filters),
  update: async (filters) => await BrandModel.findByIdAndUpdate(),
  delete: async (filters) => await BrandModel.findByIdAndDelete()
}
