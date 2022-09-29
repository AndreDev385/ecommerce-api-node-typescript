import { DataTypes, Model } from 'sequelize'
import sequelize from '../config'
import { AssetModel } from './asset.model'
import { TokenModel } from './token.model'

export class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'seller', 'admin'],
      defaultValue: 'user'
    },
    recoveryToken: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  },
  {
    sequelize,
    modelName: 'user'
  }
);

UserModel.hasMany(AssetModel, { foreignKey: 'owner', sourceKey: 'id' })

AssetModel.belongsTo(UserModel, { foreignKey: 'owner', targetKey: 'id' });
