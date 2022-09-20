import express, { NextFunction, Request, Response } from 'express';
import { SaveBrandUseCase } from '../../application/usecases/brand/save-brand';
import { DeleteBrandUseCase } from '../../application/usecases/brand/delete-brand';
import { FindOneBrandUseCase } from '../../application/usecases/brand/findone-brand';
import { ListBrandUseCase } from '../../application/usecases/brand/list-brand';

export default function brandRouter(
    saveBrand: SaveBrandUseCase,
    listBrand: ListBrandUseCase,
    findOneBrand: FindOneBrandUseCase,
    deleteBrand: DeleteBrandUseCase
) {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await listBrand.execute();
            res.json(result);
        } catch (err) {
            next(err);
        }
    });

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;
            const result = await saveBrand.execute(body);
            res.json(result);
        } catch (err) {
            next(err);
        }
    });
    router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await findOneBrand.execute(id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    });
    router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { body } = req;
            const result = await saveBrand.execute({ ...body, id });
            res.json(result);
        } catch (err) {
            next(err);
        }
    });
    router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await deleteBrand.execute(id);
            res.json(result);
        } catch (err) {
            next(err);
        }
    });
    return router;
}
