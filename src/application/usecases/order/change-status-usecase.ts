export interface ChangeOrderStatusUseCase {
  execute: (id: string, status: string) => Promise<void>;
}
