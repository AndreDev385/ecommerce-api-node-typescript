export class CreateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber?: string | null;
}

export class ReadUserDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string | null;

  constructor({ id, name, email, role, phoneNumber }: CreateUserDTO) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  }
}
