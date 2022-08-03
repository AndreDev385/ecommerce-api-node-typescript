import { User } from "../../../domain/entity/user";

export interface GenerateAccessTokenUseCase {
  execute(id: number, role:string ): string;
}
