import express, { Router } from 'express';

// Mongoose
import { brandModel } from '../../adapters/orm/mongoose/mongoose-db-wrapper';
import { MongooseBrandRepository } from '../../adapters/repository/mongoose/brand-repository';

// Sequelize
import { SequelizeBrandRepository } from '../../adapters/repository/sequilize/brand-repository';
import { brandDb } from '../../adapters/repository/sequilize/db-sequelize-wrapper';

// UseCases
import { DeleteBrandImpl } from '../../application/impl/brand/delete-brand-impl';
import { FindOneBrandImpl } from '../../application/impl/brand/findone-brand-impl';
import { ListBrandImpl } from '../../application/impl/brand/list-brand-impl';
import { SaveBrandUseCaseImpl } from '../../application/impl/brand/save-brand-impl';

import brandRouter from './brand.routes';

export const router: Router = express.Router();

router.use(
    '/brands',
    brandRouter(
        new SaveBrandUseCaseImpl(new MongooseBrandRepository(brandModel)),
        new ListBrandImpl(new SequelizeBrandRepository(brandDb)),
        new FindOneBrandImpl(new SequelizeBrandRepository(brandDb)),
        new DeleteBrandImpl(new SequelizeBrandRepository(brandDb))
    )
);
