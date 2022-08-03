import { Asset } from "../../../domain/entity/asset";

export interface UploadAssetUseCase {
  execute(object: {
    userId: number;
    asset: File;
    fileExtension: string;
  }): Promise<Asset>;
}
