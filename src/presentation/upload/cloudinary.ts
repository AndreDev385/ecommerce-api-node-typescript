import { v2 as cloudinary } from 'cloudinary';
import { Uploader } from './uploader';

cloudinary.config({
  cloud_name: 'dsqbq38fb',
  api_key: '554134288258488',
  api_secret: '6JA7NG28Uz6bBlyGiEHLczyjl4Y',
});

export class CloudinaryUploader implements Uploader {
  async upload(path: string): Promise<string> {
    const result = await cloudinary.uploader.upload(path);
    return result.secure_url;
  }
}
