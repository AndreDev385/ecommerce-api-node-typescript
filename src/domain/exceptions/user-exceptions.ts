export class InvalidPasswordError extends Error {
  constructor(msg: string = 'Invalid password'){
    super(msg)
    this.name = "InvalidPasswordError"
  }
}