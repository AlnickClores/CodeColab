const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
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

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-change", { code });
  });

  socket.on("cursor-change", ({ roomId, position, userId }) => {
    socket.to(roomId).emit("cursor-change", { position, userId });
  });

  socket.on("language-change", ({ roomId, language, code }) => {
    socket.to(roomId).emit("language-change", { language, code });
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

io.on("connection", (socket) => {
  socket.on("run-code", async ({ code, language, version, roomId }) => {
    try {
      const pistonResponse = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language,
          version,
          files: [{ content: code }],
        }
      );

      io.to(roomId).emit("code-output", {
        output: pistonResponse.data.run?.output,
        error: pistonResponse.data.run?.stderr,
        language,
      });
    } catch (error) {
      io.to(roomId).emit("code-output", {
        output: "",
        error: "Execution failed.",
        language,
      });
    }
  });
});

app.post("/execute", async (req, res) => {
  try {
    const { roomId } = req.body;
    const pistonResponse = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      req.body
    );
    res.json(pistonResponse.data);

    if (roomId) {
      io.to(roomId).emit("code-output", {
        output: pistonResponse.data.run?.output,
        error: pistonResponse.data.run?.stderr,
        language: req.body.language,
      });
    }
  } catch (error) {
    console.error("Execution error:", error.message);
    res.status(500).json({ error: error.message || "Execution failed" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

server.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
