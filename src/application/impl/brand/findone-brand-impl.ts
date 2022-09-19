import { OutputBrandDto } from '../../../domain/dtos/brand-dtos';
import { NotFoundError } from '../../../domain/exceptions/exceptions';
import { BrandRepository } from '../../../domain/repository/interface/brand-repository';
import { FindOneBrandUseCase } from '../../usecases/brand/findone-brand';

export class FindOneBrandImpl implements FindOneBrandUseCase {
    private brandRepository: BrandRepository;
    constructor(repository: BrandRepository) {
        this.brandRepository = repository;
    }

    async execute(id: string): Promise<OutputBrandDto> {
        const result = await this.brandRepository.findById(id);
        if (!result) throw new NotFoundError('Brand');
        return new OutputBrandDto(
            result.getId() as string,
            result.getName(),
            result.getDescription() as string,
            result.getProducts(),
            result.getAsset()
        );
    }
}
