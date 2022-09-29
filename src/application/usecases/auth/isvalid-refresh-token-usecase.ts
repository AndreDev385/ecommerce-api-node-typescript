export interface IsValidRefreshTokenUseCase {
  execute: (token: string) => void
}
