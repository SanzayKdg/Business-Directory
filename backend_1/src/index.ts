import express from "express";
import { NODE_ENV, PORT } from "./@config/constants.config.js";
import bodyParser from "body-parser";
import cors from "cors";
import { TypeOrmConfig } from "./@config/typeorm.config.js";
import swaggerui from "swagger-ui-express";
import specs from "./@config/swagger.config.js";
import User from "./routes/User.js";
import helmet from "helmet";
import "reflect-metadata";

const app = express();

// ------------------------------ DATABASE CONNECTION ----------------------------------------------
TypeOrmConfig.initialize()
  .then(() => console.log("Connected to database"))
  .catch((err: any) => console.log("Unable to connect to databse" + err));

// ------------------------------  MIDDLEWARES  ----------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use(helmet());
// ------------------------------ ROUTES ----------------------------------------------
app.use("/user", User);

// listener
const server = app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

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
