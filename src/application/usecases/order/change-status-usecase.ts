import { Status } from "cloudinary";

export interface ChangeOrderStatusUseCase {
  execute(id: number, status: Status): Promise<void>;
}
