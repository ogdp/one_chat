import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import connectDB from "./configs/database.js";
import Router from "./routes/index.js";
import { Server } from "socket.io";
import http from "http";
const app = express();
dotenv.config();

const { PORT, MONGO_URI } = process.env;
// Khởi tạo kết nối với cơ sở dữ liệu
connectDB(MONGO_URI);

// Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 6000,
  cors: {
    "Access-Control-Allow-Origin": "*",
    origin: "http://localhost:5173",
    // credentials: true,
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    // console.log("room", room);
    socket.join(room);
  });

  socket.on("new message", (recievedMessage) => {
    // console.log("message recieved ", recievedMessage);
    var chat = recievedMessage.chat;
    chat.users.forEach((user) => {
      if (user == recievedMessage.sender._id) return;
      socket.in(user).emit("message recieved", recievedMessage);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});

app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
// Bỏ block fetch api CORS
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
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
server.listen(PORT, (req, res) =>
  console.log("Listen server running port " + PORT)
);

export default app;
