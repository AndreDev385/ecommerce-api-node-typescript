import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import { UserModel } from './user.model';

export class TokenModel extends Model {}

TokenModel.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'token',
    timestamps: false,
  }
);
