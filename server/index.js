const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 3001;
const socketHandlers = require("./socketHandlers");

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

socketHandlers(io, rooms, userRoomMap, logRoomsStatus, axios);

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

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
