import bcrypt from 'bcrypt';
import { Credentials } from '../../application/usecases/auth/login-usecase';
import { CreateUserDTO } from '../dtos/user-dtos';
import { InvalidPasswordError } from '../exceptions/user-exceptions';
import {
    createUserSchema,
    credentialsSchema,
    updateRoleUserSchema,
} from '../schemas/user.schemas';

export class User {
    private id: string;
    private name: string;
    private email: string;
    private password: string;
    private role: string;
    private phoneNumber: string;

    getId(): string {
        return this.id
    }

    setName(str: string): void {
        
    }


    static async hashPassword(password: string) {
        const encrypt = await bcrypt.hash(password, 10);
        return encrypt;
    }

    static async validatePassword(password: string, password2: string): Promise<boolean> {
        const validPassword = await bcrypt.compare(password, password2);
        console.log(validPassword);
        if (!validPassword) {
            throw new InvalidPasswordError();
        }
        return validPassword;
    }

    static validateCreateUserData(data: CreateUserDTO) {
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
