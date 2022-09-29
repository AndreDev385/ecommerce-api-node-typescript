export interface DeleteBrandUseCase {
  execute: (id: string) => Promise<void>
}
