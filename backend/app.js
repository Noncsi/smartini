"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const socket_io_1 = require("socket.io");
const eventHandlers_1 = require("./eventHandlers");
const createServer = (port, serverOptions = {}) => {
    const ioServer = new socket_io_1.Server(port, serverOptions);
    ioServer.on("connection", (socket) => {
        socket.on("connectGameBoard", () => (0, eventHandlers_1.connectGameBoard)(socket));
        socket.on("disconnect", () => { });
        socket.on("connectGamePad", (roomCode, playerName) => (0, eventHandlers_1.connectGamePad)(socket, roomCode, playerName));
    });
    console.log(`\x1b[34m`, `Server is running...`);
};
exports.createServer = createServer;
