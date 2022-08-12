import { UpdateOptions } from "sequelize/types";
import { AssetModel } from "../../orm/sequelize/models/asset.model";
import { BrandModel } from "../../orm/sequelize/models/brand.model";
import { CategoryModel } from "../../orm/sequelize/models/category.model";
import { ProductModel } from "../../orm/sequelize/models/product.model";
import { TokenModel } from "../../orm/sequelize/models/token.model";
import { UserModel } from "../../orm/sequelize/models/user.model";
import {
  AttributesModel,
  VariationModel,
} from "../../orm/sequelize/models/variation.model";

export interface SequelizeWrapper {
  findAll(query: object): Promise<any[]>;
  create(doc: any, include?: any): Promise<any>;
  findOne(query: object): Promise<any>;
  update(values: object, where: UpdateOptions<any>): Promise<any>;
}

export const userDb: SequelizeWrapper = {
  findAll: (query) => UserModel.findAll(query),
  create: (doc) => UserModel.create(doc),
  findOne: (query) => UserModel.findOne(query),
  update: (values, where) => UserModel.update(values, where),
};

export const tokenDb: SequelizeWrapper = {
  findAll: (query) => TokenModel.findAll(query),
  create: (doc) => TokenModel.create(doc),
  findOne: (query) => TokenModel.findOne(query),
  update: (values, where) => TokenModel.update(values, where),
};

export const categoryDb: SequelizeWrapper = {
  findAll: (query) => CategoryModel.findAll(query),
  create: (doc) => CategoryModel.create(doc),
  findOne: (query) => CategoryModel.findOne(query),
  update: (values, where) => CategoryModel.update(values, where),
};

export const brandDb: SequelizeWrapper = {
  findAll: (query) => BrandModel.findAll(query),
  create: (doc) => BrandModel.create(doc),
  findOne: (query) => BrandModel.findOne(query),
  update: (values, where) => BrandModel.update(values, where),
};

export const productDb: SequelizeWrapper = {
  findAll: (query) => ProductModel.findAll(query),
  create: (doc) => ProductModel.create(doc),
  findOne: (query) => ProductModel.findOne(query),
  update: (values, where) => ProductModel.update(values, where),
};

export const variationDb: SequelizeWrapper = {
  findAll: (query) => VariationModel.findAll(query),
  create: (doc, include?: any) => VariationModel.create(doc, include),
  findOne: (query) => VariationModel.findOne(query),
  update: (values, where) => VariationModel.update(values, where),
};

export const assetDb: SequelizeWrapper = {
  findAll: (query) => AssetModel.findAll(query),
  create: (doc) => AssetModel.create(doc),
  findOne: (query) => AssetModel.findOne(query),
  update: (values, where) => AssetModel.update(values, where),
};

export const attributeDb: SequelizeWrapper = {
  findAll: (query) => AttributesModel.findAll(query),
  create: (doc) => AttributesModel.create(doc),
  findOne: (query) => AssetModel.findOne(query),
  update: (values, where) => AssetModel.update(values, where),
};
