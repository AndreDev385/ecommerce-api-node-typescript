import sequelize from '../config';
import { DataTypes } from 'sequelize';
import { VariationModel } from './variation.model';
import { BrandModel } from './brand.model';
import { CategoryModel } from './category.model';
import { AssetModel } from './asset.model';

export const ProductModel = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    /* brandId: {
      type: DataTypes.INTEGER,
      references: {
        model: BrandModel,
        key: "brandId",
      },
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: CategoryModel,
        key: "categoryId",
      },
      allowNull: false,
    }, */
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  }
)

ProductModel.hasMany(VariationModel, {
  foreignKey: 'productId',
  sourceKey: 'id'
})

VariationModel.belongsTo(ProductModel, {
  foreignKey: 'productId',
  targetKey: 'id'
})

ProductModel.hasOne(AssetModel, {
  foreignKey: 'productId',
  sourceKey: 'id'
})

AssetModel.belongsTo(ProductModel, {
  foreignKey: 'productId',
  targetKey: 'id'
})
