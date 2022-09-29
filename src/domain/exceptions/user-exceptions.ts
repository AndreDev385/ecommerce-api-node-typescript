export class InvalidPasswordError extends Error {
  constructor (msg = 'Invalid password') {
    super(msg)
    this.name = 'InvalidPasswordError';
  }
}
