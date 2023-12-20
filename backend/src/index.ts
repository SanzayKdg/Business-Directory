import express from "express";
import { NODE_ENV, PORT } from "./@config/constants.config.js";

const app = express();

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
