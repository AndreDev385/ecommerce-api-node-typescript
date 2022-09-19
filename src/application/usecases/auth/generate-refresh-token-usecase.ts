export interface GenerateRefreshTokenUseCase {
  execute(id: string, role: string): string
}