import { DataTypes } from "sequelize";
import sequelize from "../config";
import { UserModel } from "./user.model";
import { VariationModel } from "./variation.model";

export const OrderModel = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      values: ["completed", "waiting", "canceled"],
      defaultValue: "waiting",
    },
  },
  {
    timestamps: true,
  }
);

UserModel.hasMany(OrderModel, {
  foreignKey: "userId",
  sourceKey: "id",
});

OrderModel.belongsTo(UserModel, {
  foreignKey: "userId",
  targetKey: "id",
});


OrderModel.belongsToMany(VariationModel, {
  through: "order_variations",
});

VariationModel.belongsToMany(OrderModel, {
  through: "order_variations",
});
