import express, { Router } from 'express';
import { SequelizeAssetRepository } from '../../adapters/repository/sequilize/asset-repository';

//Repositories
import { SequelizeBrandRepository } from '../../adapters/repository/sequilize/brand-repository';
import { SequelizeCategoryRepository } from '../../adapters/repository/sequilize/category-repository';
import {
  assetDb,
  brandDb,
  categoryDb,
  itemDB,
  orderDb,
  productDb,
  tokenDb,
  userDb,
  variationDb,
} from '../../adapters/repository/sequilize/db-sequelize-wrapper';
import { SequelizeOrderRepository } from '../../adapters/repository/sequilize/order-repository';
import { SequelizeProductRepository } from '../../adapters/repository/sequilize/product-repository';
import { SequelizeTokenRepository } from '../../adapters/repository/sequilize/token-repository';
import { SequelizeUserRepository } from '../../adapters/repository/sequilize/user-repository';
import { SequelizeVariationRepository } from '../../adapters/repository/sequilize/variation-repository';
import { ListAssetsImpl } from '../../application/impl/assets/list-assets';
import { UploadAssetAWS } from '../../application/impl/assets/upload-asset-aws';
import { UploadAssetCloudinary } from '../../application/impl/assets/upload-asset-cloudinary';
import { GenerateAndSignAccessTokenImpl } from '../../application/impl/auth/generate-access-token';
import { GenerateAndSignRefreshTokenImpl } from '../../application/impl/auth/generate-refresh-token';
import { IsValidRefreshTokenImpl } from '../../application/impl/auth/isvalid-refresh-token';
import { LoginImpl } from '../../application/impl/auth/login-impl';
import { RefreshTokenImpl } from '../../application/impl/auth/refresh-token';

// Sequelize
// Brand
import { DeleteBrandImpl } from '../../application/impl/brand/delete-brand-impl';
import { FindOneBrandImpl } from '../../application/impl/brand/findone-brand-impl';
import { ListBrandImpl } from '../../application/impl/brand/list-brand-impl';
import { SaveBrandUseCaseImpl } from '../../application/impl/brand/save-brand-impl';

//Category
import { DeleteCategoryImpl } from '../../application/impl/category/delete-category-impl';
import { FindOneCategoryImpl } from '../../application/impl/category/findone-category-impl';
import { ListCategoryImpl } from '../../application/impl/category/list-category-impl';
import { SaveCategoryImpl } from '../../application/impl/category/save-category-impl';
import { ChangeOrderStatusImpl } from '../../application/impl/order/change-status-impl';
import { CreateOrderImpl } from '../../application/impl/order/create-order-impl';
import { FindOneOrderImpl } from '../../application/impl/order/findone-order-impl';
import { ListOrderImpl } from '../../application/impl/order/list-order-impl';
import { UpdateOrderImpl } from '../../application/impl/order/update-order-impl';

//Product
import { DeleteProductImpl } from '../../application/impl/product/delete-product-impl';
import { FindOneProductImpl } from '../../application/impl/product/findone-product-impl';
import { ListProductImpl } from '../../application/impl/product/list-product-impl';
import { SaveProductImpl } from '../../application/impl/product/save-product-impl';
import { DeleteUserImpl } from '../../application/impl/user/delete-user';
import { FindOneUserImpl } from '../../application/impl/user/findone-user';
import { ListUserImpl } from '../../application/impl/user/list-user';
import { CreateUserImpl } from '../../application/impl/user/save-user';
import { UpdateUserRoleImpl } from '../../application/impl/user/update-role-user';

//Variation
import { ListVariationImpl } from '../../application/impl/variation/list-variation-impl';
import { SaveVariationImpl } from '../../application/impl/variation/save-variation-impl';
import { uploadHandler } from '../middlewares/multer-handler';
import { CloudinaryUploader } from '../upload/cloudinary';
import assetRouter from './asset.routes';
import authRouter from './auth.routes';

import brandRouter from './brand.routes';
import categoryRouter from './category.routes';
import orderRoutes from './order.routes';
import productRouter from './product.routes';
import userRouter from './user.routes';
import variationRouter from './variation.routes';

export const router: Router = express.Router();

router.use(
  '/assets',
  assetRouter(
    ListAssetsImpl.getInstance(SequelizeAssetRepository.getInstance(assetDb)),
    UploadAssetAWS.getInstance(SequelizeAssetRepository.getInstance(assetDb)),
    UploadAssetCloudinary.getInstance(
      SequelizeAssetRepository.getInstance(assetDb),
      new CloudinaryUploader()
    )
  )
);

router.use(
  '/brands',
  brandRouter(
    SaveBrandUseCaseImpl.getInstance(SequelizeBrandRepository.getInstance(brandDb)),
    ListBrandImpl.getInstance(SequelizeBrandRepository.getInstance(brandDb)),
    FindOneBrandImpl.getInstance(SequelizeBrandRepository.getInstance(brandDb)),
    DeleteBrandImpl.getInstance(SequelizeBrandRepository.getInstance(brandDb))
  )
);

router.use(
  '/categories',
  categoryRouter(
    ListCategoryImpl.getInstance(SequelizeCategoryRepository.getInstance(categoryDb)),
    SaveCategoryImpl.getInstance(SequelizeCategoryRepository.getInstance(categoryDb)),
    FindOneCategoryImpl.getInstance(SequelizeCategoryRepository.getInstance(categoryDb)),
    DeleteCategoryImpl.getInstance(SequelizeCategoryRepository.getInstance(categoryDb))
  )
);

router.use(
  '/products',
  productRouter(
    ListProductImpl.getInstance(SequelizeProductRepository.getInstance(productDb)),
    SaveProductImpl.getInstance(SequelizeProductRepository.getInstance(productDb)),
    FindOneProductImpl.getInstance(SequelizeProductRepository.getInstance(productDb)),
    DeleteProductImpl.getInstance(SequelizeProductRepository.getInstance(productDb))
  )
);

router.use(
  '/variations',
  variationRouter(
    ListVariationImpl.getInstance(SequelizeVariationRepository.getInstance(variationDb)),
    SaveVariationImpl.getInstance(SequelizeVariationRepository.getInstance(variationDb))
  )
);

router.use(
  '/users',
  userRouter(
    ListUserImpl.getInstance(SequelizeUserRepository.getInstance(userDb)),
    CreateUserImpl.getInstance(SequelizeUserRepository.getInstance(userDb)),
    FindOneUserImpl.getInstance(SequelizeUserRepository.getInstance(userDb)),
    UpdateUserRoleImpl.getInstance(SequelizeUserRepository.getInstance(userDb)),
    DeleteUserImpl.getInstance(SequelizeUserRepository.getInstance(userDb))
  )
);

router.use(
  '/auth',
  authRouter(
    new LoginImpl(
      SequelizeUserRepository.getInstance(userDb),
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
  '/orders',
  orderRoutes(
    ListOrderImpl.getInstance(SequelizeOrderRepository.getInstance(orderDb, itemDB)),
    CreateOrderImpl.getInstance(
      SequelizeOrderRepository.getInstance(orderDb, itemDB),
      SequelizeVariationRepository.getInstance(variationDb)
    ),
    FindOneOrderImpl.getInstance(SequelizeOrderRepository.getInstance(orderDb, itemDB)),
    ChangeOrderStatusImpl.getInstance(
      SequelizeOrderRepository.getInstance(orderDb, itemDB),
      SequelizeVariationRepository.getInstance(variationDb)
    )
  )
);
