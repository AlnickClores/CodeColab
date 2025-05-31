const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const activeRooms = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("create-room", (roomId) => {
    activeRooms.set(roomId, new Set([socket.id]));
    socket.join(roomId);
    console.log(`Room created: ${roomId}`);
  });

  socket.on("check-room", (roomId) => {
    const exists = activeRooms.has(roomId);
    socket.emit("room-status", { roomId, exists });
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    if (activeRooms.has(roomId)) {
      activeRooms.get(roomId).add(socket.id);
    } else {
      activeRooms.set(roomId, new Set([socket.id]));
    }
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on("disconnecting", () => {
    const rooms = Array.from(socket.rooms);
    rooms.forEach((roomId) => {
      if (roomId !== socket.id) {
        const room = activeRooms.get(roomId);
        if (room) {
          room.delete(socket.id);
          if (room.size === 0) {
            activeRooms.delete(roomId);
            console.log(`Room ${roomId} removed - no users remaining`);
          }
        }
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server running on http://localhost:3001");
});
