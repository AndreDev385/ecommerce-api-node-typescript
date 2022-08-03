import { Asset } from "../../../domain/entity/asset";

export interface ListAssetsUseCase {
  execute(): Promise<Asset[]>;
}
