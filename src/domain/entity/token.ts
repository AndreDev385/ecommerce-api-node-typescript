export interface Token {
  id: number
  token: string
  isValid: boolean
  email: string
  userId: number
}

export interface CreateToken {
  token: string
  email: string
  userId: number
}