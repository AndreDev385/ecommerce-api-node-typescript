import { Brand } from '../../../src/domain/entity/brand';
import { SaveBrandUseCaseImpl } from '../../../src/application/impl/brand/save-brand-impl';
import { BrandRepository } from '../../../src/domain/repository/interface/brand-repository';
import { InputBrandDto, OutputBrandDto } from '../../../src/domain/dtos/brand-dtos';
import { v4 } from 'uuid';
import { create } from 'domain';

describe('Test Create or Update Brand', () => {
    let brandRepository: BrandRepository;
    let saveBrandUseCase: SaveBrandUseCaseImpl;

    class MockBrandRepository implements BrandRepository {
        create(brand: Brand): Promise<Brand> {
            throw new Error('Method not implemented.');
        }
        findAll(): Promise<Brand[]> {
            throw new Error('Method not implemented.');
        }
        findById(id: string): Promise<Brand> {
            throw new Error('Method not implemented.');
        }
        findByName(name: string): Promise<Brand | null> {
            throw new Error('Method not implemented.');
        }
        update(brand: Brand): Promise<Brand> {
            throw new Error('Method not implemented.');
        }
        delete(id: string): Promise<void> {
            throw new Error('Method not implemented.');
        }
    }

    beforeEach(() => {
        jest.clearAllMocks();
        brandRepository = new MockBrandRepository();
        saveBrandUseCase = new SaveBrandUseCaseImpl(brandRepository);
    });

    describe('Validate wrong data', () => {
        test('Missing parameters', async () => {
            const noName: any = { id: 'asd' };

            await expect(saveBrandUseCase.execute(noName)).rejects.toThrow(
                Error('Name is required')
            );
        });
    });

    describe('Test creating brand', () => {
        test('Brand already exists', async () => {
            const id = v4();
            jest.spyOn(brandRepository, 'findByName').mockImplementation(() =>
                Promise.resolve(new Brand('Nike', id))
            );

            return saveBrandUseCase
                .execute({ name: 'Nike' } as InputBrandDto)
                .catch((e) => expect(e).toEqual(Error('Brand already exist!')));
        });

        test('Create Successfull', async () => {
            const id = v4();
            let name = 'Nike';

            jest.spyOn(brandRepository, 'findByName').mockImplementation(() =>
                Promise.resolve(null)
            );

            let created = new Brand(name);
            jest.spyOn(brandRepository, 'create').mockImplementation(() =>
                Promise.resolve(created)
            );

            const result = await saveBrandUseCase.execute({ name } as InputBrandDto);
            expect(result).toEqual(
                new OutputBrandDto(
                    created.getId(),
                    created.getName(),
                    created.getDescription(),
                    created.getProducts(),
                    created.getAsset()
                )
            );
        });

        test('Update succesfull', async () => {
            const id = v4();
            let name = 'Nike';

            jest.spyOn(brandRepository, 'findByName').mockImplementation(() =>
                Promise.resolve(new Brand(name))
            );

            let updated = new Brand('Adidas', 'Sport brand');
            jest.spyOn(brandRepository, 'update').mockImplementation(() =>
                Promise.resolve(updated)
            );

            const result = await saveBrandUseCase.execute({
                name: 'Adidas',
                id,
                description: 'Sport brand',
            } as InputBrandDto);
            expect(result).toEqual(
                new OutputBrandDto(
                    updated.getId(),
                    updated.getName(),
                    updated.getDescription(),
                    updated.getProducts(),
                    updated.getAsset()
                )
            );
        });
    });
});