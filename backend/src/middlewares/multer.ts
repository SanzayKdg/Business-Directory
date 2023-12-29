import multer from "multer";
import { v4 as uuid } from "uuid";

function fileFilter(req: any, file: any, callback: any) {
  const mimeType = file.mimetype.split("/")[0];
  if (mimeType === "image") {
    callback(null, true);
  } else {
    req.fileTypError = true;
    callback(null, false);
  }
}

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "src/uploads");
  },
  filename(req, file, callback) {
    // saving file with unique id instead of original name
    const id = uuid();

    // splitting original name and extension name
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

export const uploads = multer({ storage });
