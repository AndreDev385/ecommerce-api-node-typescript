
import { Asset } from "../../../domain/entity/asset";

export interface UploadImageUseCase {
  execute({userId, path}: {userId: number, path:String}): Promise<Asset>
}
