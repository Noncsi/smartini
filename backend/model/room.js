"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const player_1 = require("./player");
var GameStage;
(function (GameStage) {
    GameStage[GameStage["lobby"] = 0] = "lobby";
    GameStage[GameStage["game"] = 1] = "game";
})(GameStage || (GameStage = {}));
class Room {
    constructor(roomCode, gameBoardSocket) {
        this.stage = GameStage.lobby;
        this.players = [];
        this.addPlayer = (id, name) => {
            this.players.push(new player_1.Player(id, name, this.roomCode));
        };
        this.roomCode = roomCode;
        this.gameBoardSocket = gameBoardSocket;
        // put gameBoardSocket into room upon initialization
        this.gameBoardSocket.join(roomCode);
        // emit room code
        this.gameBoardSocket.emit("roomCreated", roomCode);
    }
}
exports.Room = Room;
