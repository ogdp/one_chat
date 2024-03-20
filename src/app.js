import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import connectDB from "./configs/database.js";
import Router from "./routes/index.js";
const app = express();
dotenv.config();

const { PORT, MONGO_URI } = process.env;
// Khởi tạo kết nối với cơ sở dữ liệu
connectDB(MONGO_URI);

app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
// Bỏ block fetch api CORS
app.use(cors());
app.use(morgan("tiny"));

// Theme home
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("/", (req, res) => {
  // docs https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
  // return res.send("Hello world !");
  return res.sendFile(path.join(__dirname, "./public/index.html"));
});
// Navigate Router
app.use("/api", Router);

// Notfound api
app.use((req, res, next) => {
  //   const error = new Error("API not found");
  //   error.status = 404;
  //   next(error);
  return res.status(404).json({
    message: "API không tồn tại, bỏ cái thói rình mò API người khác đi",
  });
});

// Required listening Express server
app.listen(PORT, (req, res) =>
  console.log("Listen server running port " + PORT)
);

export default app;
