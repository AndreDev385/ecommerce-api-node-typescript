enum Role {
  seller = "seller",
  admin = "admin",
}

class User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
  phoneNumber: string;
  isActive: boolean;

  constructor(
    id: number,
    name: string,
    lastname: string,
    email: string,
    password: string,
    role: Role,
    phoneNumber: string,
    isActive: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.isActive = isActive;
  }
}
