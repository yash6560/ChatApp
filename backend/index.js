const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const DBconnect = require('./DB');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routers/user.router');
const messageRouter = require('./routers/message.router');
const http = require("http");
const socketHandler = require('./utils/socket'); // Socket handler import

const app = express();
const server = http.createServer(app); // Create HTTP server from Express

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND, // Allow frontend origin
    credentials: true, // Allow cookies
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

// Initialize Socket.IO
socketHandler(server);

// Routes
app.use('/user', userRouter);
app.use('/message', messageRouter);

// Use `server.listen` instead of `app.listen`
server.listen(process.env.PORT, () => {
  DBconnect();
  console.log(`Server is running on port ${process.env.PORT}...`);
});
