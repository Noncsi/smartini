"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectGamePad = exports.connectGameBoard = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const state_1 = require("./state");
const connectGameBoard = (socket) => {
    const roomCode = new short_unique_id_1.default({ length: 4 }).rnd().toUpperCase();
    state_1.rooms.add(roomCode);
    socket.join(roomCode);
    socket.emit("roomCreated", roomCode);
    console.log(`\x1b[32m`, `Host has been created in room: ${roomCode}`);
};
exports.connectGameBoard = connectGameBoard;
const connectGamePad = (socket, roomCode, playerName) => {
    const isRoomExist = state_1.rooms.has(roomCode);
    if (isRoomExist) {
        socket.join(roomCode);
        socket.to(roomCode).emit("newPlayer", playerName);
        console.log(`\x1b[32m`, `${playerName} has joined to room: ${roomCode}.`);
    }
    else {
        console.log(`\x1b[31m`, `Room was not found.`);
    }
};
exports.connectGamePad = connectGamePad;
