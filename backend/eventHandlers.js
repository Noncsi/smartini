"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestion = exports.setPlayerReadyStatus = exports.connectGamePad = exports.createRoom = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const log_1 = require("./log");
const room_1 = require("./model/room");
const app_1 = require("./app");
// export const disconnect = (socket: GameBoardSocket | GamePadSocket) => {
//   // make diff between board closing and player quitting
//   const room = Array.from(rooms.values()).find(
//     (room: Room) => room.id === socket.id
//   );
//   const player = Array.from(rooms.values()).find((room: Room) =>
//     room.players.find((player: Player) => player.id === socket.id)
//   );
//   if (room !== undefined && player === undefined) {
//     // it's a board
//     room.players.forEach((player: Player) => {
//       // socket.d;
//     });
//     rooms.delete(room.code);
//   }
//   if (room === undefined && player !== undefined) {
//     // it's a player
//   }
// };
const createRoom = (socket) => {
    const roomCode = new short_unique_id_1.default({ length: 4 })
        .rnd()
        .toUpperCase();
    app_1.rooms.set(roomCode, new room_1.Room(socket.id, roomCode, socket));
    log_1.Log.success.gameBoardCreated(roomCode);
};
exports.createRoom = createRoom;
const connectGamePad = (socket, roomCode, playerName, cb) => {
    var _a;
    if (app_1.rooms.has(roomCode)) {
        // ts flow analysis doesn't recognise .has() as undefined check
        const room = app_1.rooms.get(roomCode);
        room === null || room === void 0 ? void 0 : room.addPlayer(socket.id, playerName);
        socket.join(roomCode);
        socket.to((_a = room === null || room === void 0 ? void 0 : room.gameBoardSocket.id) !== null && _a !== void 0 ? _a : "").emit("players", room === null || room === void 0 ? void 0 : room.players);
        cb(true); // send
        log_1.Log.success.playerJoined(playerName, roomCode);
    }
    else {
        log_1.Log.error.roomNotFound();
    }
};
exports.connectGamePad = connectGamePad;
const setPlayerReadyStatus = (socket, roomCode) => {
    const room = app_1.rooms.get(roomCode);
    if (room) {
        const player = room.players.find((player) => player.id === socket.id);
        if (player) {
            player.isReady = !player.isReady;
            socket
                .to(room.gameBoardSocket.id)
                .emit("ready", player.id, player.isReady);
        }
        if (room.players.every((player) => player.isReady)) {
            socket.nsp.to(room.code).emit("startGame");
            console.log(`Game has started in room: ${roomCode}`);
        }
    }
};
exports.setPlayerReadyStatus = setPlayerReadyStatus;
const getQuestion = (socket, roomCode) => {
    console.log(roomCode);
    fetch("https://opentdb.com/api.php?amount=1").then((response) => {
        response.json().then((resp) => {
            console.log("results", resp.results[0]);
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
