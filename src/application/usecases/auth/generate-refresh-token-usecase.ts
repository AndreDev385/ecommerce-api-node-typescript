export interface GenerateRefreshTokenUseCase {
  execute(id: number, role: string): string
}