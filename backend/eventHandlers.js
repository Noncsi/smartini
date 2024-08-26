"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsReady = exports.connectGamePad = exports.createRoom = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const log_1 = require("./log");
const room_1 = require("./model/room");
const app_1 = require("./app");
const createRoom = (socket) => {
    const roomCode = new short_unique_id_1.default({ length: 4 })
        .rnd()
        .toUpperCase();
    app_1.rooms.set(roomCode, new room_1.Room(roomCode, socket));
    log_1.Log.success.gameBoardCreated(roomCode);
};
exports.createRoom = createRoom;
const connectGamePad = (gamePadSocket, roomCode, playerName, cb) => {
    var _a;
    if (app_1.rooms.has(roomCode)) {
        // ts flow analysis doesn't recognise .has() as undefined check
        const room = app_1.rooms.get(roomCode);
        room === null || room === void 0 ? void 0 : room.addPlayer(gamePadSocket.id, playerName);
        gamePadSocket.join(roomCode);
        gamePadSocket
            .to((_a = room === null || room === void 0 ? void 0 : room.gameBoardSocket.id) !== null && _a !== void 0 ? _a : "")
            .emit("players", room === null || room === void 0 ? void 0 : room.players);
        cb(true); // send
        log_1.Log.success.playerJoined(playerName, roomCode);
    }
    else {
        log_1.Log.error.roomNotFound();
    }
};
exports.connectGamePad = connectGamePad;
const markAsReady = (socket, roomCode) => {
    const room = app_1.rooms.get(roomCode);
    if (room) {
        const readyPlayer = room.players.find((player) => player.id === socket.id);
        if (readyPlayer) {
            readyPlayer.isReady = true;
            socket.to(room.gameBoardSocket.id).emit("ready", readyPlayer.id, true);
        }
    }
};
exports.markAsReady = markAsReady;
