import express from "express";

import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import brandRouter from "./brand.routes";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";
import variationRouter from "./variation.routes";

import { SequilizeUserRepository } from "../../adapters/repository/sequilize/user-repository";
import {
  brandDb,
  categoryDb,
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
import { ListCategoryImpl } from "../../application/impl/category/list-category-impl";
import { SequelizeCategoryRepository } from "../../adapters/repository/sequilize/category-repository";
import { CreateCategoryImpl } from "../../application/impl/category/create-category-impl";
import { FindOneCategoryImpl } from "../../application/impl/category/findone-category-impl";
import { UpdateCategoryImpl } from "../../application/impl/category/update-category-impl";
import { DeleteCategoryImpl } from "../../application/impl/category/delete-category-impl";
import { CreateBrandImpl } from "../../application/impl/brand/create-brand-impl";
import { SequelizeBrandRepository } from "../../adapters/repository/sequilize/brand-repository";
import { FindOneBrandImpl } from "../../application/impl/brand/findone-brand-impl";
import { UpdateBrandImpl } from "../../application/impl/brand/update-brand-impl";
import { DeleteBrandImpl } from "../../application/impl/brand/delete-brand-impl";
import { ListBrandImpl } from "../../application/impl/brand/list-brand-impl";

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

router.use(
  "/category",
  categoryRouter(
    new ListCategoryImpl(new SequelizeCategoryRepository(categoryDb)),
    new CreateCategoryImpl(new SequelizeCategoryRepository(categoryDb)),
    new FindOneCategoryImpl(new SequelizeCategoryRepository(categoryDb)),
    new UpdateCategoryImpl(new SequelizeCategoryRepository(categoryDb)),
    new DeleteCategoryImpl(new SequelizeCategoryRepository(categoryDb))
  )
);

router.use(
  "/brand",
  brandRouter(
    new CreateBrandImpl(new SequelizeBrandRepository(brandDb)),
    new ListBrandImpl(new SequelizeBrandRepository(brandDb)),
    new FindOneBrandImpl(new SequelizeBrandRepository(brandDb)),
    new UpdateBrandImpl(new SequelizeBrandRepository(brandDb)),
    new DeleteBrandImpl(new SequelizeBrandRepository(brandDb))
  )
);

router.use("/product", productRouter);
router.use("/variation", variationRouter);
