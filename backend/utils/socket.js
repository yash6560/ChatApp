const socketIo = require('socket.io');

const socketHandler = (server) => {
    const io = socketIo(server, {
        cors : {
            origin: "http://localhost:5173", // Replace with client-side URL
            methods: ["GET", "POST"],
        }
    });
    io.on("connection", (socket) => {
        console.log("New user connected");
    
        // Listen for incoming messages
        socket.on("chatMessage", (message) => {
            console.log("Message received:", message);
    
            // Broadcast message to all connected clients
            io.emit("chatMessage", message)
        });
    
        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("User disconnected");
          })
    });
}



module.exports = socketHandler;