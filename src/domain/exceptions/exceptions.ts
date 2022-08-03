export class NotFoundError extends Error {
  constructor(variable: string | null = null, msg: string = "Not found!") {
    super(variable ? `${variable} not found!` : "Not found!");
  }
}
