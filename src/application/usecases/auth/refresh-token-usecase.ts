export interface RefreshTokenUseCase {
  execute(token: string): string
}