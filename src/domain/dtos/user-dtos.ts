export class CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: string;
    phoneNumber?: string;
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
