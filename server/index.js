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

const rooms = new Map();
const userRoomMap = new Map();

const logRoomsStatus = () => {
  console.log(`Active Rooms: ${rooms.size}`);
  rooms.forEach((users, roomId) => {
    console.log(`Room ${roomId}: ${users.size} users`);
  });
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  logRoomsStatus();

  socket.on("check-room", (roomId) => {
    const roomExists = rooms.has(roomId);
    socket.emit("room-status", { roomId, exists: roomExists });
  });

  socket.on("join-room", (roomId) => {
    const previousRoom = userRoomMap.get(socket.id);
    if (previousRoom) {
      socket.leave(previousRoom);
      if (rooms.has(previousRoom)) {
        rooms.get(previousRoom).delete(socket.id);
        io.to(previousRoom).emit("user-count", rooms.get(previousRoom).size);
      }
    }

    socket.join(roomId);
    userRoomMap.set(socket.id, roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }

    rooms.get(roomId).add(socket.id);
    const userCount = rooms.get(roomId).size;

    console.log(`Room ${roomId} now has ${userCount} users`);
    console.log("Users in room:", Array.from(rooms.get(roomId)));

    io.to(roomId).emit("user-count", userCount);
    logRoomsStatus();
  });

  socket.on("leave-room", (roomId) => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).delete(socket.id);
      userRoomMap.delete(socket.id);
      const userCount = rooms.get(roomId).size;

      io.to(roomId).emit("user-count", userCount);
      console.log(
        `User ${socket.id} left room ${roomId}. Now has ${userCount} users`
      );

      if (userCount === 0) {
        rooms.delete(roomId);
      }
      logRoomsStatus();
    }
  });

  socket.on("disconnecting", () => {
    const roomId = userRoomMap.get(socket.id);
    if (roomId && rooms.has(roomId)) {
      rooms.get(roomId).delete(socket.id);
      userRoomMap.delete(socket.id);
      const userCount = rooms.get(roomId).size;

      io.to(roomId).emit("user-count", userCount);
      console.log(
        `User ${socket.id} disconnected from room ${roomId}. Now has ${userCount} users`
      );

      if (userCount === 0) {
        rooms.delete(roomId);
      }
      logRoomsStatus();
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    logRoomsStatus();
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server running on http://localhost:3001");
});

console.log(rooms);
