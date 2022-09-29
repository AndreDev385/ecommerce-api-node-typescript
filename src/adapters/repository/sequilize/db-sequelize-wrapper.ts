import { UpdateOptions } from 'sequelize/types';
import { AssetModel } from '../../orm/sequelize/models/asset.model';
import { BrandModel } from '../../orm/sequelize/models/brand.model';
import { CategoryModel } from '../../orm/sequelize/models/category.model';
import { OrderModel } from '../../orm/sequelize/models/order.model';
import { ProductModel } from '../../orm/sequelize/models/product.model';
import { TokenModel } from '../../orm/sequelize/models/token.model';
import { UserModel } from '../../orm/sequelize/models/user.model';
import { AttributesModel, VariationModel } from '../../orm/sequelize/models/variation.model';

export interface SequelizeWrapper {
  findAll: (query: object) => Promise<any[]>;
  create: (doc: any, include?: any) => Promise<any>;
  findOne: (query: object) => Promise<any>;
  update: (values: object, where: UpdateOptions<any>) => Promise<any>;
  delete: (query: object) => Promise<number>;
}

export const userDb: SequelizeWrapper = {
  findAll: async (query) => await UserModel.findAll(query),
  create: async (doc) => await UserModel.create(doc),
  findOne: async (query) => await UserModel.findOne(query),
  update: async (values, where) => await UserModel.update(values, where),
  delete: async (query) => await UserModel.destroy(query),
};

export const tokenDb: SequelizeWrapper = {
  findAll: async (query) => await TokenModel.findAll(query),
  create: async (doc) => await TokenModel.create(doc),
  findOne: async (query) => await TokenModel.findOne(query),
  update: async (values, where) => await TokenModel.update(values, where),
  delete: async (query) => await UserModel.destroy(query),
};

export const categoryDb: SequelizeWrapper = {
  findAll: async (query) => await CategoryModel.findAll(query),
  create: async (doc) => await CategoryModel.create(doc),
  findOne: async (query) => await CategoryModel.findOne(query),
  update: async (values, where) => await CategoryModel.update(values, where),
  delete: async (query) => await CategoryModel.destroy(query),
};

export const brandDb: SequelizeWrapper = {
  findAll: async (query) => await BrandModel.findAll(query),
  create: async (doc) => await BrandModel.create(doc),
  findOne: async (query) => await BrandModel.findOne(query),
  update: async (values, where) => await BrandModel.update(values, where),
  delete: async (query) => await BrandModel.destroy(query),
};

export const productDb: SequelizeWrapper = {
  findAll: async (query) => await ProductModel.findAll(query),
  create: async (doc) => await ProductModel.create(doc),
  findOne: async (query) => await ProductModel.findOne(query),
  update: async (values, where) => await ProductModel.update(values, where),
  delete: async (query) => await ProductModel.destroy(query),
};

export const variationDb: SequelizeWrapper = {
  findAll: async (query) => await VariationModel.findAll(query),
  create: async (doc, include?: any) => await VariationModel.create(doc, include),
  findOne: async (query) => await VariationModel.findOne(query),
  update: async (values, where) => await VariationModel.update(values, where),
  delete: async (query) => await VariationModel.destroy(query),
};

export const assetDb: SequelizeWrapper = {
  findAll: async (query) => await AssetModel.findAll(query),
  create: async (doc) => await AssetModel.create(doc),
  findOne: async (query) => await AssetModel.findOne(query),
  update: async (values, where) => await AssetModel.update(values, where),
  delete: async (query) => await AssetModel.destroy(query),
};

export const attributeDb: SequelizeWrapper = {
  findAll: async (query) => await AttributesModel.findAll(query),
  create: async (doc) => await AttributesModel.create(doc),
  findOne: async (query) => await AttributesModel.findOne(query),
  update: async (values, where) => await AttributesModel.update(values, where),
  delete: async (query) => await AttributesModel.destroy(query),
};

export const orderDb: SequelizeWrapper = {
  findAll: async (query) => await OrderModel.findAll(query),
  create: async (doc) => await OrderModel.create(doc),
  findOne: async (query) => await OrderModel.findOne(query),
  update: async (values, where) => await OrderModel.update(values, where),
  delete: async (query) => await OrderModel.destroy(query),
};
