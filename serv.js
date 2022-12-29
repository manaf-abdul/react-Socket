import express from "express"
const app = express();
import { createServer } from "http";
let server = createServer(app)


const options = {
    cors: {
        origins: ["http://localhost/"],
    }
}

import socketio from 'socket.io'
const io = socketio(server, options)


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