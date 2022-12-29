const app = require("express")();
const server = require("http").createServer(app);

const options = {
      cors: {
          origins: ["http://localhost/"],
          // methods: ["GET", "POST"],
          // allowedHeaders: ["token"],
          // credentials: true,
      }
  };


const io = require("socket.io")(server,options);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(8080);