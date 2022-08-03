export interface Jwt {
  token: string;
  refreshToken: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginUseCase {
  execute(credentials: Credentials): Promise<Jwt>;
}
