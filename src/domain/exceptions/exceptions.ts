export class NotFoundError extends Error {
  constructor (variable: string | null = null, msg = 'Not found!') {
    super(variable ? `${variable} not found!` : 'Not found!')
  }
}
