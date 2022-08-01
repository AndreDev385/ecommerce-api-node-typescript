import express, { query } from "express";

import userRouter from "./user.routes";
import { UserRepositoryImpl } from "../../adapters/repository/user-repository";
import { SequelizeUserDataSource } from "../../adapters/data-source/sequelize/sequelize-user-data-source";
import { ListUserImpl } from "../../application/impl/user/list-user";
import { CreateUserImpl } from "../../application/impl/user/create-user";
import { UserModel } from "../../adapters/orm/sequelize/models/user.model";
import { SequelizeWrapper } from "../../adapters/data-source/sequelize/user-sequelize-wrapper";
import { FindOneUserImpl } from "../../application/impl/user/findone-user";
import { UpdateUserRoleImpl } from "../../application/impl/user/update-role-user";
import { DeleteUserImpl } from "../../application/impl/user/delete-user";

export const router = express.Router();

const userDb: SequelizeWrapper = {
  findAll: (query) => UserModel.findAll(query),
  create: (doc) => UserModel.create(doc),
  findOne: (query) => UserModel.findOne(query),
  updateRole: (id, role) => UserModel.update({ role }, { where: { id } }),
  deleteOne: (id) => UserModel.update({ isActive: false }, { where: { id } }),
};

router.use(
  "/users",
  userRouter(
    new ListUserImpl(
      new UserRepositoryImpl(new SequelizeUserDataSource(userDb))
    ),
    new CreateUserImpl(
      new UserRepositoryImpl(new SequelizeUserDataSource(userDb))
    ),
    new FindOneUserImpl(
      new UserRepositoryImpl(new SequelizeUserDataSource(userDb))
    ),
    new UpdateUserRoleImpl(
      new UserRepositoryImpl(new SequelizeUserDataSource(userDb))
    ),
    new DeleteUserImpl(
      new UserRepositoryImpl(new SequelizeUserDataSource(userDb))
    )
  )
);
