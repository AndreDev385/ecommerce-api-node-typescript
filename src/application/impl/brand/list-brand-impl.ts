import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { ListBrandUseCase } from '../../usecases/brand/list-brand';
import { OutputBrandDto } from '../../../domain/dtos/brand-dtos';

export class ListBrandImpl implements ListBrandUseCase {
    private brandRepository: BrandRepository;
    constructor(repository: BrandRepository) {
        this.brandRepository = repository;
    }

    async execute(): Promise<OutputBrandDto[]> {
        const result = await this.brandRepository.findAll();
        return result.map(
            (brand) =>
                new OutputBrandDto(
                    brand.getId() as string,
                    brand.getName(),
                    brand.getDescription() as string,
                    brand.getProducts(),
                    brand.getAsset()
                )
        );
    }
}
