import { FindOneBrandImpl } from '../../../application/impl/brand/findone-brand-impl';
import { BrandModel } from './models/brand-model';

export interface MongooseWrapper {
    create(document: object): Promise<any>;
    find(filters: object): Promise<any[]>;
    findOne(filters: object): Promise<any>;
    findOneAndUpdate(filters: object, data: object, options?: object): Promise<any>;
    findOneAndDelete(filters: object): Promise<any>;
}

export const brandModel: MongooseWrapper = {
    create: async (document) => await BrandModel.create(document),
    find: async (filters) => await BrandModel.find(filters),
    findOne: async (filters) => await BrandModel.findOne(filters),
    findOneAndUpdate: async (filters, data) => await BrandModel.findOneAndUpdate(filters, data),
    findOneAndDelete: async (filters) => await BrandModel.findOneAndDelete(filters),
};
