import sequelize from '../config';
import { DataTypes } from 'sequelize';
import { AssetModel } from './asset.model';
import { ProductModel } from './product.model';

// export class BrandModel extends Model {}

export const BrandModel = sequelize.define(
  'brand',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }
)

BrandModel.hasMany(ProductModel, {
  foreignKey: 'brandId',
  sourceKey: 'id'
})

ProductModel.belongsTo(BrandModel, {
  foreignKey: 'brandId',
  targetKey: 'id'
})

BrandModel.hasOne(AssetModel, {
  foreignKey: 'brandId',
  sourceKey: 'id'
})

AssetModel.belongsTo(BrandModel, {
  foreignKey: 'brandId',
  targetKey: 'id'
})
