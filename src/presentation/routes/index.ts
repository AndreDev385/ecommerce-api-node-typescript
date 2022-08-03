import express from "express";

import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import brandRouter from "./brand.routes";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";
import variationRouter from "./variation.routes"

import { SequilizeUserRepository } from "../../adapters/repository/sequilize/user-repository";
import {
  tokenDb,
  userDb,
} from "../../adapters/repository/sequilize/db-sequelize-wrapper";
import { ListUserImpl } from "../../application/impl/user/list-user";
import { CreateUserImpl } from "../../application/impl/user/create-user";
import { FindOneUserImpl } from "../../application/impl/user/findone-user";
import { UpdateUserRoleImpl } from "../../application/impl/user/update-role-user";
import { DeleteUserImpl } from "../../application/impl/user/delete-user";
import { LoginImpl } from "../../application/impl/auth/login-impl";
import { SequelizeTokenRepository } from "../../adapters/repository/sequilize/token-repository";
import { GenerateAndSignAccessTokenImpl } from "../../application/impl/auth/generate-access-token";
import { GenerateAndSignRefreshTokenImpl } from "../../application/impl/auth/generate-refresh-token";
import { RefreshTokenImpl } from "../../application/impl/auth/refresh-token";
import { IsValidRefreshTokenImpl } from "../../application/impl/auth/isvalid-refresh-token";

export const router = express.Router();

router.use(
  "/users",
  userRouter(
    new ListUserImpl(new SequilizeUserRepository(userDb)),
    new CreateUserImpl(new SequilizeUserRepository(userDb)),
    new FindOneUserImpl(new SequilizeUserRepository(userDb)),
    new UpdateUserRoleImpl(new SequilizeUserRepository(userDb)),
    new DeleteUserImpl(new SequilizeUserRepository(userDb))
  )
);

// auth Router
router.use(
  "/auth",
  authRouter(
    new LoginImpl(
      new SequilizeUserRepository(userDb),
      new SequelizeTokenRepository(tokenDb),
      new GenerateAndSignAccessTokenImpl(),
      new GenerateAndSignRefreshTokenImpl()
    ),
    new RefreshTokenImpl(
      new GenerateAndSignAccessTokenImpl(),
      new IsValidRefreshTokenImpl(new SequelizeTokenRepository(tokenDb))
    )
  )
);

router.use("/brand", brandRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);
router.use("/variation", variationRouter)
