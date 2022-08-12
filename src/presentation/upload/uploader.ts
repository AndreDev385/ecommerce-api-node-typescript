export interface Uploader {
  upload(path: string): Promise<string>;
}
