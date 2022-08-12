import multer from "multer";
import path from "path";

export const uploadHandler = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});
