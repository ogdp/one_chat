import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/database.js";
import morgan from "morgan";

dotenv.config();
const app = express();
app.use(morgan("tiny"));

connectDB(process.env.MONGO_URI);
app.get("/", (req, res) => res.send(`Express on Vercel ${process.env.PORT}`));

app.listen(process.env.PORT, () =>
  console.log(`Server ready on port ${process.env.PORT}`)
);

export default app;
