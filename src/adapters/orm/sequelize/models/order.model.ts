import { DataTypes } from 'sequelize';
import sequelize from '../config';
import { UserModel } from './user.model';
import { VariationModel } from './variation.model';

export const Item = sequelize.define(
  'item',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variationId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export const OrderModel = sequelize.define(
  'order',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      values: ['completed', 'waiting', 'canceled'],
      defaultValue: 'waiting',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

UserModel.hasMany(OrderModel, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

OrderModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'id',
});

OrderModel.hasMany(Item, {
  foreignKey: 'orderId',
  sourceKey: 'id',
});

Item.belongsTo(OrderModel, {
  foreignKey: 'orderId',
  targetKey: 'id',
});

Item.hasOne(VariationModel, {
  foreignKey: 'itemId',
  sourceKey: 'id',
});

VariationModel.belongsTo(Item, {
  foreignKey: 'itemId',
  targetKey: 'id',
});
