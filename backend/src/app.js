import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "https://chat-app-httpashika.vercel.app"],
  credentials: true
}));

const port = process.env.PORT;

import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

mongoose.connect(process.env.MONGODB_URI).then((res) => {
  console.log("mongoDB connected:" + res.connection.host);
  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
});

