import sequelize from '../config'
import { DataTypes, Model } from 'sequelize'
import { UserModel } from './user.model'

export class AssetModel extends Model {}

AssetModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    /* owner: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: "id",
      },
    }, */
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    optimizedUrl: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'asset'
  }
);
