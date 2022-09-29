import sequelize from '../config';
import { DataTypes, Model, ModelStatic } from 'sequelize';
import { AssetModel } from './asset.model';
import { ProductModel } from './product.model';

export const CategoryModel = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  }
)

CategoryModel.hasMany(ProductModel, {
  foreignKey: 'categoryId',
  sourceKey: 'id'
})

ProductModel.belongsTo(CategoryModel, {
  foreignKey: 'categoryId',
  targetKey: 'id'
})

CategoryModel.hasOne(AssetModel, {
  foreignKey: 'categoryId',
  sourceKey: 'id'
})

AssetModel.belongsTo(CategoryModel, {
  foreignKey: 'categoryId',
  targetKey: 'id'
})
