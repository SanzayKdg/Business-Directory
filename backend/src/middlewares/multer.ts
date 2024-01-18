import multer from "multer";
import { v4 as uuid } from "uuid";
import { extname } from "path";
const limits = { fileSize: 1024 * 1024 * 3 }; // accpets file lestt than or equal to 3 MB
function fileFilter(req: any, file: any, callback: any) {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
    req.fileTypError = true;
    callback(null, false);
  }

  callback(null, true);
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "src/uploads");
  },
  filename(req, file, callback) {
    // extracting extension of file
    const extName = extname(file.originalname);

    // saving file with unique id instead of original name
    callback(null, `${uuid()}${extName}`);
  },
});

export const avatarUpload = multer({ limits, storage, fileFilter }).single(
  "avatar"
);

// export const multipleUploads = multer({ storage }).array("images", 5);

export const upload = multer({ limits, storage, fileFilter }).fields([
  { name: "logo", maxCount: 1 },
  { name: "image", maxCount: 5 },
]);

export const blogUpload = multer({ limits, storage, fileFilter }).fields([
  { name: "cover", maxCount: 1 },
  { name: "image", maxCount: 3 },
]);
