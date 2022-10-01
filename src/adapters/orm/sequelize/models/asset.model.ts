import sequelize from '../config';
import { DataTypes, Model } from 'sequelize';
import { UserModel } from './user.model';

export class AssetModel extends Model {}

AssetModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optimizedUrl: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'asset',
    timestamps: false,
  }
);
