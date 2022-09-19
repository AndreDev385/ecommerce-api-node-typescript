import { User } from "../../../domain/entity/user";

export interface GenerateAccessTokenUseCase {
  execute(id: string, role:string ): string;
}
