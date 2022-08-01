import bcrypt from 'bcrypt'

export class User {
  static async hashPassword(password: string){
    const encrypt = await bcrypt.hash(password, 10)
    return encrypt
  }
}

interface BaseUser {
  name: string
  email: string
  role?: string
  phoneNumber?: string
}

export interface ReadUser extends BaseUser {
  id: number
}

export interface CreateUser extends BaseUser {
  password: string
}
