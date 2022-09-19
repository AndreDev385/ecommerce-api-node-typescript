import { ReadAssetDTO } from '../../../domain/dtos/asset-dtos';

export interface UploadImageUseCase {
    execute({ userId, path }: { userId: string; path: String }): Promise<ReadAssetDTO>;
}
