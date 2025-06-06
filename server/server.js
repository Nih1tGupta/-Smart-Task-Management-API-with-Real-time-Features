require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const { createMessage } = require("./controllers/messageController")
const messageRoutes = require("./routes/messageRoutes")



const app = express();
const server = http.createServer(app);
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});


// middleware to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// connect database
connectDB();


// middelware
app.use(express.json());


// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);


// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


io.on('connection', (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", async ({ from, to, text }) => {
    try {
      const message = await createMessage({ from, to, text });
      if (message) io.emit("receive_message", message);
    } catch (error) {
      io.emit("error_sending_message", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// start server

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});





