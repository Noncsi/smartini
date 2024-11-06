"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestion = exports.setPlayerReadyStatus = exports.reJoinGamePadToRoom = exports.joinGamePadToRoom = exports.connectGamePad = exports.createRoom = exports.disconnect = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const log_1 = require("./log");
const room_1 = require("./model/room");
const app_1 = require("./app");
const disconnect = (socket) => {
    var _a, _b;
    // make diff between board closing and player quitting
    const isGameBoard = Array.from(app_1.rooms.values()).some((room) => room.gameBoardSocket.id === socket.id);
    const isGamePad = Array.from(app_1.rooms.values()).some((room) => room.gamePads.find((gamePad) => gamePad.socket.id === socket.id));
    if (isGameBoard) {
        const room = Array.from(app_1.rooms.values()).find((room) => room.gameBoardSocket.id === socket.id);
        if (room) {
            // pause game
            room.isPaused = true;
            // send players a message that the board disconected
            room.gameBoardSocket.to(room.code).emit("roomDisconnected");
            // button for "close room / end game" if players want to finish
            // automatically continues upon reconnect
            log_1.Log.info.gameBoardDisconnected(room.code);
        }
    }
    else if (isGamePad) {
        const room = Array.from(app_1.rooms.values()).find((room) => room.gamePads.find((gamePad) => gamePad.socket.id === socket.id));
        if (room) {
            // pauses game
            room.isPaused = true;
            // send board an option for continue without disconnected player (stays in room, but freezed)
            room.gameBoardSocket.to(room.code).emit("playerDisconnected");
            // automatically continues upon reconnect
            // disconnected player's pad jumps back to join game view
            // freeze player
            const disconnectedPlayer = (_b = (_a = room.gamePads.find((gamePad) => gamePad.socket.id === socket.id)) === null || _a === void 0 ? void 0 : _a.player.name) !== null && _b !== void 0 ? _b : "";
            log_1.Log.info.gamePadDisconnected(disconnectedPlayer);
        }
    }
    else {
        // socket couldn't be identified
    }
};
exports.disconnect = disconnect;
const createRoom = (socket) => {
    const roomCode = new short_unique_id_1.default({ length: 4 })
        .rnd()
        .toUpperCase();
    app_1.rooms.set(roomCode, new room_1.Room(roomCode, socket));
    log_1.Log.success.gameBoardCreated(roomCode);
};
exports.createRoom = createRoom;
const connectGamePad = (roomCodeForReconnect, cb) => {
    app_1.rooms.has(roomCodeForReconnect) ? cb(true) : cb(false);
};
exports.connectGamePad = connectGamePad;
const joinGamePadToRoom = (socket, roomCode, playerName, cb) => {
    if (app_1.rooms.has(roomCode)) {
        // ts flow analysis doesn't recognise .has() as undefined check
        const room = app_1.rooms.get(roomCode);
        room === null || room === void 0 ? void 0 : room.addGamePad(socket, playerName);
        cb(true);
        log_1.Log.success.playerJoined(playerName, roomCode);
    }
    else {
        cb(false);
        log_1.Log.error.roomNotFound();
    }
};
exports.joinGamePadToRoom = joinGamePadToRoom;
const reJoinGamePadToRoom = (socket, roomCode, playerId, cb) => {
    if (app_1.rooms.has(roomCode)) {
        // ts flow analysis doesn't recognise .has() as undefined check
        const room = app_1.rooms.get(roomCode);
        room === null || room === void 0 ? void 0 : room.reconnectGamePad(playerId);
        cb(true);
        log_1.Log.success.playerJoined(playerId, roomCode);
    }
    else {
        cb(false);
        log_1.Log.error.roomNotFound();
    }
};
exports.reJoinGamePadToRoom = reJoinGamePadToRoom;
const setPlayerReadyStatus = (socket, roomCode) => {
    const room = app_1.rooms.get(roomCode);
    if (room) {
        const gamePad = room.gamePads.find((gamePad) => gamePad.socket.id === socket.id);
        if (gamePad) {
            gamePad.player.isReady = !gamePad.player.isReady;
            socket
                .to(room.gameBoardSocket.id)
                .emit("ready", gamePad.socket.id, gamePad.player.isReady);
        }
        if (room.gamePads.every((gamePad) => gamePad.player.isReady)) {
            socket.nsp.to(room.code).emit("startGame");
            console.log(`Game has started in room: ${roomCode}`);
        }
    }
};
exports.setPlayerReadyStatus = setPlayerReadyStatus;
const getQuestion = (socket, roomCode) => {
    console.log(roomCode);
    fetch("https://opentdb.com/api.php?amount=1&type=multiple").then((response) => {
        response.json().then((resp) => {
            const question = {
                question: resp.results[0].question,
                correctAnswer: resp.results[0].correct_answer,
                wrongAnswers: resp.results[0].incorrect_answers,
            };
            socket.nsp.to(roomCode).emit("question", question);
        });
    });
};
exports.getQuestion = getQuestion;
