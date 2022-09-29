import { Status } from 'cloudinary';

export interface ChangeOrderStatusUseCase {
  execute: (id: string, status: Status) => Promise<void>
}
