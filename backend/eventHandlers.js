"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAnswer = exports.getQuestion = exports.setPlayerReadyStatus = exports.reJoinPlayerToRoom = exports.joinPlayerToRoom = exports.connectPlayer = exports.createRoom = exports.disconnect = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const log_1 = require("./log");
const room_1 = require("./model/room");
const app_1 = require("./app");
let correctAnswer;
const disconnect = (socket) => {
    var _a, _b;
    // make diff between board closing and player quitting
    const isGameBoard = Array.from(app_1.rooms.values()).some((room) => room.gameBoardSocket.id === socket.id);
    const isPlayer = Array.from(app_1.rooms.values()).some((room) => room.players.find((player) => player.socket.id === socket.id));
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
    else if (isPlayer) {
        const room = Array.from(app_1.rooms.values()).find((room) => room.players.find((player) => player.socket.id === socket.id));
        if (room) {
            // pauses game
            room.isPaused = true;
            // send board an option for continue without disconnected player (stays in room, but freezed)
            room.gameBoardSocket.to(room.code).emit("playerDisconnected");
            // automatically continues upon reconnect
            // disconnected player jumps back to join game view
            // freeze player
            const disconnectedPlayer = (_b = (_a = room.players.find((player) => player.socket.id === socket.id)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "";
            log_1.Log.info.playerDisconnected(disconnectedPlayer);
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
const connectPlayer = (roomCodeForReconnect, cb) => {
    app_1.rooms.has(roomCodeForReconnect) ? cb(true) : cb(false);
};
exports.connectPlayer = connectPlayer;
const joinPlayerToRoom = (socket, roomCode, playerName, cb) => {
    const room = app_1.rooms.get(roomCode);
    if (!room) {
        cb(null);
        log_1.Log.error.roomNotFound();
        return;
    }
    const newPlayer = room.addPlayer(socket, playerName);
    if (newPlayer) {
        cb(newPlayer.id);
        log_1.Log.success.playerJoined(playerName, roomCode);
    }
    else {
        cb(null); // name already taken
    }
};
exports.joinPlayerToRoom = joinPlayerToRoom;
const reJoinPlayerToRoom = (socket, roomCode, playerId, cb) => {
    if (app_1.rooms.has(roomCode)) {
        // ts flow analysis doesn't recognise .has() as undefined check
        const room = app_1.rooms.get(roomCode);
        room === null || room === void 0 ? void 0 : room.reconnectPlayer(playerId);
        cb(true);
        log_1.Log.success.playerJoined(playerId, roomCode);
    }
    else {
        cb(false);
        log_1.Log.error.roomNotFound();
    }
};
exports.reJoinPlayerToRoom = reJoinPlayerToRoom;
const setPlayerReadyStatus = (socket, playerId, roomCode) => {
    const room = app_1.rooms.get(roomCode);
    if (room) {
        const player = room.players.find((player) => player.id === playerId);
        if (player) {
            player.isReady = !player.isReady;
            socket // tell the gameBoard who clicked ready
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
const shuffle = (array) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
};
const getQuestion = (socket, roomCode) => {
    fetch("https://opentdb.com/api.php?amount=1&type=multiple").then((response) => {
        response.json().then((resp) => {
            const question = {
                question: resp.results[0].question,
                correctAnswer: resp.results[0].correct_answer,
                wrongAnswers: resp.results[0].incorrect_answers,
            };
            // const shuffledIndexedAnswers = Object.assign(
            //   {},
            //   shuffle([question.correctAnswer, ...question.wrongAnswers])
            // );
            // console.log("ASD", shuffledIndexedAnswers);
            // correctAnswerId = shuffledIndexedAnswers.find(
            //   (answer: any) => answer.value === question.correctAnswer
            // );
            correctAnswer = question.correctAnswer;
            socket.nsp.to(roomCode).emit("question", {
                question: question.question,
                answerOptions: shuffle([
                    question.correctAnswer,
                    ...question.wrongAnswers,
                ]),
            });
        });
    });
};
exports.getQuestion = getQuestion;
const checkAnswer = (socket, playerId, text) => {
    const isCorrect = text === correctAnswer;
    socket.emit("answerResult", isCorrect);
};
exports.checkAnswer = checkAnswer;
