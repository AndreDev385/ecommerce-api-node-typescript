import multer from 'multer';
import path from 'path';

export const uploadHandler = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log(file, 'File');
    console.log(ext, 'Extension');
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});
