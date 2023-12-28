import * as dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT!);
export const NODE_ENV = process.env.ENV;

export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRE = process.env.JWT_EXPIRE!;
export const COOKIE_EXPIRE = parseInt(process.env.COOKIE_EXPIRE!);

export const BASE_URL = {
  frontend: process.env.FRONTEND_URL,
  backend: process.env.BACKEND_URL,
};

export const DATABASE_URI = process.env.DB_URI!


export const OTP_EXPIRY = parseInt(process.env.OTP_EXPIRY!);

export const SMTP_INFO = {
  user: process.env.SMPT_MAIL!,
  host: process.env.SMPT_HOST!,
  port: parseInt(process.env.SMPT_PORT!),
  password: process.env.SMPT_PASSWORD!,
};
