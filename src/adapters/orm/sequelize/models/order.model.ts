import { DataTypes } from 'sequelize';
import sequelize from '../config';
import { UserModel } from './user.model';
import { VariationModel } from './variation.model';

export const OrderItem = sequelize.define('orderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export const OrderModel = sequelize.define('order', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    values: ['completed', 'waiting', 'canceled'],
    defaultValue: 'waiting',
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

UserModel.hasMany(OrderModel, {
  foreignKey: 'userId',
  sourceKey: 'id',
});

OrderModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'id',
});

OrderModel.hasMany(OrderItem, {
  foreignKey: 'orderId',
  sourceKey: 'id',
});

OrderItem.belongsTo(OrderModel, {
  foreignKey: 'orderId',
  targetKey: 'id',
});

OrderItem.hasOne(VariationModel, {
  foreignKey: 'itemId',
  sourceKey: 'id',
});

VariationModel.belongsTo(OrderItem, {
  foreignKey: 'itemId',
  targetKey: 'id',
});
