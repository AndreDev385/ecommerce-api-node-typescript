import { Brand } from '../../../domain/entity/brand';
import { InputBrandDto, OutputBrandDto } from '../../../domain/dtos/brand-dtos';
import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { SaveBrandUseCase } from '../../usecases/brand/save-brand';

export class SaveBrandUseCaseImpl implements SaveBrandUseCase {
    private brandRepository: BrandRepository;
    constructor(repository: BrandRepository) {
        this.brandRepository = repository;
    }

    async execute(input: InputBrandDto): Promise<OutputBrandDto> {
        const brand = new Brand(input.name, input.id, input.description, input.asset);
        let result: Brand;
        if (brand.getId()) {
            result = await this.brandRepository.update(brand);
        } else {
            const existBrand = await this.brandRepository.findByName(brand.getName());

            if (existBrand instanceof Brand && existBrand.getName() == brand.getName())
                throw new Error('Brand already exist!');
            result = await this.brandRepository.create(brand);
        }

        return new OutputBrandDto(
            result.getId() as string,
            result.getName(),
            result.getDescription() as string,
            result.getProducts(),
            result.getAsset()
        );
    }
}
