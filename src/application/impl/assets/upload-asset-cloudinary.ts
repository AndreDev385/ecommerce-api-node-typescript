import { Asset } from "../../../domain/entity/asset";
import { AssetRepository } from "../../../domain/repository/interface/asset-repository";
import { Uploader } from "../../../presentation/upload/uploader";
import { UploadImageUseCase } from "../../usecases/assets/upload-image-usecase";

export class UploadAssetCloudinary implements UploadImageUseCase {
  constructor(
    private repository: AssetRepository,
    private uploader: Uploader
  ) {}
  async execute({
    userId,
    path,
  }: {
    userId: number;
    path: string;
  }): Promise<Asset> {
    const url = await this.uploader.upload(path);
    const result = await this.repository.create({
      owner: userId,
      originalUrl: url,
    });
    return result;
  }
}
