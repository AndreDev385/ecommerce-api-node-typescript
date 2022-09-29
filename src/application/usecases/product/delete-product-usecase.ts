export interface DeleteProductUseCase {
  execute: (id: string) => Promise<void>
}
