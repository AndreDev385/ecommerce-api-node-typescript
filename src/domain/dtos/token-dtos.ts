export interface Token {
  id: string
  token: string
  isValid: boolean
  email: string
  userId: string
}

export interface CreateToken {
  token: string
  email: string
  userId: string
}
