import express from "express";

import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import brandRouter from "./brand.routes";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";
import variationRouter from "./variation.routes";
import assetRouter from "./asset.routes";
import attributeRouter from "./attribute.routes";
import orderRoutes from "./order.routes";

import { SequilizeUserRepository } from "../../adapters/repository/sequilize/user-repository";
import {
  assetDb,
  attributeDb,
  brandDb,
  categoryDb,
  orderDb,
  productDb,
  tokenDb,
  userDb,
  variationDb,
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
import { ListProductImpl } from "../../application/impl/product/list-product-impl";
import { SequelizeProductRepository } from "../../adapters/repository/sequilize/product-repository";
import { CreateProductImpl } from "../../application/impl/product/create-product-impl";
import { FindOneProductImpl } from "../../application/impl/product/findone-product-impl";
import { UpdateProductImpl } from "../../application/impl/product/update-product-impl";
import { DeleteProductImpl } from "../../application/impl/product/delete-product-impl";
import { ListVariationImpl } from "../../application/impl/variation/list-variation-impl";
import { SequelizeVariationRepository } from "../../adapters/repository/sequilize/variation-repository";
import { CreateVariationImpl } from "../../application/impl/variation/create-variation-impl";
import { ListAssetsImpl } from "../../application/impl/assets/list-assets";
import { SequelizeAssetRepository } from "../../adapters/repository/sequilize/asset-repository";
import { UploadAssetCloudinary } from "../../application/impl/assets/upload-asset-cloudinary";
import { CloudinaryUploader } from "../upload/cloudinary";
import { UpdateAssetImpl } from "../../application/impl/assets/update-asset-impl";
import { ListAttributeImpl } from "../../application/impl/variation/list-attribute-impl";
import { SequelizeAttributeRepository } from "../../adapters/repository/sequilize/attribute-repository";
import { CreateAttributeImpl } from "../../application/impl/variation/create-attribute-impl";
import { ListOrderImpl } from "../../application/impl/order/list-order-impl";
import { SequelizeOrderRepository } from "../../adapters/repository/sequilize/order-repository";
import { CreateOrderImpl } from "../../application/impl/order/create-order-impl";
import { UpdateOrderImpl } from "../../application/impl/order/update-order-impl";
import { FindOneOrderImpl } from "../../application/impl/order/findone-order-impl";
import { ChangeOrderStatusImpl } from "../../application/impl/order/change-status-impl";

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

router.use(
  "/product",
  productRouter(
    new ListProductImpl(new SequelizeProductRepository(productDb)),
    new CreateProductImpl(new SequelizeProductRepository(productDb)),
    new FindOneProductImpl(new SequelizeProductRepository(productDb)),
    new UpdateProductImpl(new SequelizeProductRepository(productDb)),
    new DeleteProductImpl(new SequelizeProductRepository(productDb))
  )
);

router.use(
  "/variation",
  variationRouter(
    new ListVariationImpl(new SequelizeVariationRepository(variationDb)),
    new CreateVariationImpl(new SequelizeVariationRepository(variationDb))
  )
);

router.use(
  "/assets",
  assetRouter(
    new ListAssetsImpl(new SequelizeAssetRepository(assetDb)),
    new UploadAssetCloudinary(
      new SequelizeAssetRepository(assetDb),
      new CloudinaryUploader()
    ),
    new UpdateAssetImpl(new SequelizeAssetRepository(assetDb))
  )
);

router.use(
  "/attributes",
  attributeRouter(
    new ListAttributeImpl(new SequelizeAttributeRepository(attributeDb)),
    new CreateAttributeImpl(new SequelizeAttributeRepository(attributeDb))
  )
);

router.use(
  "/orders",
  orderRoutes(
    new ListOrderImpl(new SequelizeOrderRepository(orderDb, variationDb)),
    new CreateOrderImpl(new SequelizeOrderRepository(orderDb, variationDb)),
    new FindOneOrderImpl(new SequelizeOrderRepository(orderDb, variationDb)),
    new UpdateOrderImpl(new SequelizeOrderRepository(orderDb, variationDb)),
    new ChangeOrderStatusImpl(
      new SequelizeOrderRepository(orderDb, variationDb)
    )
  )
);
