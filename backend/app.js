"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = exports.rooms = void 0;
const socket_io_1 = require("socket.io");
const eventHandlers_1 = require("./eventHandlers");
const log_1 = require("./log");
exports.rooms = new Map();
const createServer = (port, serverOptions = {}) => {
    const ioServer = new socket_io_1.Server(port, serverOptions);
    ioServer.on("connection", (socket) => {
        socket.on("createRoom", () => (0, eventHandlers_1.createRoom)(socket));
        socket.on("connectGamePad", (roomCode, playerName, cb) => (0, eventHandlers_1.connectGamePad)(socket, roomCode, playerName, cb));
        socket.on("markAsReady", (roomCode) => {
            return (0, eventHandlers_1.markAsReady)(socket, roomCode);
        });
    });
    log_1.Log.info.serverIsRunning();
};
exports.createServer = createServer;
