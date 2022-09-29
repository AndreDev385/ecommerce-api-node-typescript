import sequelize from '../config';
import { DataTypes, Model } from 'sequelize';
import { ProductModel } from './product.model';
import { AssetModel } from './asset.model';
import { SequilizeUserRepository } from '../../../repository/sequilize/user-repository';

// export class VariationModel extends Model {}
export const AttributesModel = sequelize.define('attribute', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const VariationModel = sequelize.define('variation', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  offerPrice: {
    type: DataTypes.FLOAT,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isAvaible: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

VariationModel.hasMany(AssetModel, {
  foreignKey: 'variationId',
  sourceKey: 'id',
});

AssetModel.belongsTo(VariationModel, {
  foreignKey: 'variationId',
  targetKey: 'id',
});

export const Variation_Attributes = sequelize.define('variations__attributes', {
  selfGranted: DataTypes.BOOLEAN,
});

VariationModel.belongsToMany(AttributesModel, {
  through: Variation_Attributes,
});
AttributesModel.belongsToMany(VariationModel, {
  through: Variation_Attributes,
});
