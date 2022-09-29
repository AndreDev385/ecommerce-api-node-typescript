import express, { Router } from 'express';

//Repositories
import { SequelizeBrandRepository } from '../../adapters/repository/sequilize/brand-repository';
import { SequelizeCategoryRepository } from '../../adapters/repository/sequilize/category-repository';
import {
  brandDb,
  categoryDb,
  productDb,
  variationDb,
} from '../../adapters/repository/sequilize/db-sequelize-wrapper';
import { SequelizeProductRepository } from '../../adapters/repository/sequilize/product-repository';
import { SequelizeVariationRepository } from '../../adapters/repository/sequilize/variation-repository';

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

//Product
import { DeleteProductImpl } from '../../application/impl/product/delete-product-impl';
import { FindOneProductImpl } from '../../application/impl/product/findone-product-impl';
import { ListProductImpl } from '../../application/impl/product/list-product-impl';
import { SaveProductImpl } from '../../application/impl/product/save-product-impl';

//Variation
import { ListVariationImpl } from '../../application/impl/variation/list-variation-impl';
import { SaveVariationImpl } from '../../application/impl/variation/save-variation-impl';

import brandRouter from './brand.routes';
import categoryRouter from './category.routes';
import productRouter from './product.routes';
import variationRouter from './variation.routes';

export const router: Router = express.Router();

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
