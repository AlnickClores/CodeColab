const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = 3001;
server.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
