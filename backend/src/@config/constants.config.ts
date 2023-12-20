import * as dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT!);
export const NODE_ENV = process.env.ENV;

export const JWT_SECRET = process.env.JWT_SECRET!;

export const BASE_URL = {
  frontend: process.env.FRONTEND_URL,
  backend: process.env.BACKEND_URL,
};

export const DATABSE = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME!,
};
