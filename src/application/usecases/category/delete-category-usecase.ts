export interface DeleteCategoryUseCase {
    execute(id: string): Promise<void>;
}
