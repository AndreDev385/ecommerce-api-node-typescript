import { Attribute } from "../../../domain/entity/variation";

export interface ListAttributeUseCase {
  execute(): Promise<Attribute[]>
}