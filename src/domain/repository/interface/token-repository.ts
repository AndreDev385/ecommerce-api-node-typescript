import { Token } from "../../entity/token";
import { ReadUser } from "../../entity/user";

export interface TokenRepository {
  isExistUser(email: string): ReadUser;
  isValidPassword(password: string, userPassword: string): void;
  isValidRefreshToken(token: string): void;
  loginUser(object: { email: string; password: string }): {
    token: string;
    refreshToken: string;
  };
  refreshToken(token: string): string;
  generateAndSignAccessToken(user: ReadUser): string;
  generateAndSignRefreshToken(user: ReadUser): string;
  generateAndSignRecoveryToken(user: ReadUser): string;
  changePassword(token: string, password: string): { message: string };
}
