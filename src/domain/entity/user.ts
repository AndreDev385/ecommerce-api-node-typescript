import bcrypt from "bcrypt";
import { Credentials } from "../../application/usecases/auth/login-usecase";
import { InvalidPasswordError } from "../exceptions/user-exceptions";
import {
  createUserSchema,
  credentialsSchema,
  updateRoleUserSchema,
} from "../schemas/user.schemas";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;

  static async hashPassword(password: string) {
    const encrypt = await bcrypt.hash(password, 10);
    return encrypt;
  }

  static async validatePassword(
    password: string,
    password2: string
  ): Promise<boolean> {
    const validPassword = await bcrypt.compare(password, password2);
    console.log(validPassword);
    if (!validPassword) {
      throw new InvalidPasswordError();
    }
    return validPassword;
  }

  static validateCreateUserData(data: CreateUser) {
    const { error } = createUserSchema.validate(data, {
      abortEarly: false,
    });
    if (error) throw error;
  }

  static validateUserRole(role: string) {
    const { error } = updateRoleUserSchema.validate(
      { role },
      {
        abortEarly: false,
      }
    );
    if (error) throw error;
  }

  static validateCredentials(credentials: Credentials) {
    const { error } = credentialsSchema.validate(credentials, {
      abortEarly: false,
    });
    if (error) throw error;
  }
}

interface BaseUser {
  name: string;
  email: string;
  role?: string;
  phoneNumber?: string;
}

export interface ReadUser extends BaseUser {
  id: number;
}

export interface CreateUser extends BaseUser {
  password: string;
}

export class ReadUserDTO {
  id: number;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;

  constructor(
    id: number,
    name: string,
    email: string,
    role: string,
    phoneNumber: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.phoneNumber = phoneNumber;
  }
}
