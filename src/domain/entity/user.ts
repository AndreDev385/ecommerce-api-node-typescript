import bcrypt from 'bcrypt';
import { typeCheck } from 'type-check';
import { v4 } from 'uuid';
import { InvalidPasswordError } from '../exceptions/user-exceptions';

export class User {
  private readonly id: string;
  private name: string;
  private email: string;
  private password: string;
  private role: string;
  private phoneNumber: string | null;

  constructor (name: string, email: string, password: string, role: string, phoneNumber?: string) {
    this.id = v4();
    this.setName(name);
    this.setEmail(email);
    this.setPassword(password);
    this.setRole(role);
    this.setPhoneNumber(phoneNumber);
  }

  setName (str: string): void {
    if (!str) {
      throw new Error('Name is required');
    }
    if (!typeCheck('String', str)) {
      throw new Error('Name should be a string');
    }
    if (str.length < 3) {
      throw new Error('Name should have at least 3 characters');
    }

    this.name = str;
  }

  setEmail (str: string): void {
    if (!str) {
      throw new Error('Email is required');
    }
    if (!typeCheck('String', str)) {
      throw new Error('Email should be a string');
    }

    if (
      str
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) == null
    ) {
      throw new Error('Invalid email');
    }
    this.email = str;
  }

  private hashPassword (password: string) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    this.password = hash;
  }

  setPassword (str: string) {
    if (!str) {
      throw new Error('Password is required');
    }
    if (!typeCheck('String', str)) {
      throw new Error('Password should be a string');
    }
    if (str.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) == null) {
      throw new Error('Invalid password');
    }

    this.hashPassword(str);
  }

  static validatePassword (password: string, hash: string) {
    const isValid = bcrypt.compareSync(password, hash);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    return isValid;
  }

  setRole (str: string) {
    if (!str) {
      throw new Error('Role is required');
    }
    if (!typeCheck('String', str)) {
      throw new Error('Role should be a string');
    }
    if (str !== 'user' && str !== 'admin' && str !== 'seller') {
      throw new Error('Invalid role');
    }
    this.role = str;
  }

  setPhoneNumber (str?: string) {
    if (!str) {
      this.phoneNumber = null;
      return
    }
    if (!typeCheck('String', str)) {
      throw new Error('Phone number should be a string');
    }
    if ((str?.match(/^[0-9]+$/)) == null) {
      throw new Error('Invalid phone number');
    }
    this.phoneNumber = str;
  }

  getData () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      phoneNumber: this.phoneNumber
    };
  }
}
