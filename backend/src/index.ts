import express from "express";
import { PORT } from "./@config/constants.config.js";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./@config/db.config.js";
import swaggerui from "swagger-ui-express";
import specs from "./@config/swagger.config.js";
import Auth from "./routes/auth.js";
import Users from "./routes/users.js";
import Business from "./routes/business.js";
import Admin from "./routes/admin.js";
import Blogs from "./routes/blogs.js";
import ContactUs from "./routes/contactus.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import "reflect-metadata";
import path from "path";
const app = express();

// ------------------------------ DATABASE CONNECTION ----------------------------------------------
connectDB();

// ------------------------------  MIDDLEWARES  ----------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use("/src/uploads", express.static(process.cwd() + "/src/uploads"));

app.use(helmet());

// ------------------------------ ROUTES ----------------------------------------------
app.use("/api/auth", Auth);
app.use("/api/users", Users);
app.use("/api/business", Business);
app.use("/api/admin", Admin);
app.use("/api/blogs", Blogs);
app.use("/api/contact", ContactUs);

// listener
const server = app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

// ------------------------------ ERRORS ----------------------------------------------

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Unhandled Promis Rejection
process.on("unhandledRejection", (err: any) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
}); 
