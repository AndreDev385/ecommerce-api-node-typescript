import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { NotFoundError } from '../../domain/exceptions/exceptions'

export function errorHandler (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
  } else if (err.name == 'ValidationError') {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message });
  }
}
