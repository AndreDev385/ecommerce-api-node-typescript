import { NextFunction, Response } from 'express';
import { fileTypeFromBuffer } from 'file-type';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export async function isImage(req: any, res: Response, next: NextFunction) {
  const contentType = req.get('content-type');

  if (!contentType) {
    throw new Error('Content-type is required');
  }
  if (!ACCEPTED_TYPES.includes(contentType)) {
    throw new Error('Invalid content-type');
  }

  let fileInfomation = await fileTypeFromBuffer(req.body);
  console.log(fileInfomation);

  if (!fileInfomation) {
    throw new Error('There is not file');
  }

  /*if (!ACCEPTED_TYPES.includes(fileInfomation?.mime)) {
    throw new Error('File does not match content-type');
  }*/
  let re = /(?:\.([^.]+))?$/;

  req.fileExtension = next();
}
