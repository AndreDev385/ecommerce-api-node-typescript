import { InputBrandDto, OutputBrandDto } from "../../../domain/dtos/brand-dtos";

export interface UpdateBrandUseCase {
  execute(brand: InputBrandDto): Promise<OutputBrandDto>;
}
