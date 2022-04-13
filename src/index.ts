import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});