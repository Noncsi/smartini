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
        this.isPaused = false;
        this.players = [];
        this.addPlayer = (socket, name) => {
            const isNameTaken = this.players.some((player) => player.name === name);
            if (isNameTaken) {
                this.emitNameTaken();
            }
            else {
                this.players.push(new player_1.Player(socket, this.code, name));
                this.emitPlayers();
            }
        };
        this.reconnectPlayer = (playerId) => {
            const reconnectingGamePad = this.players.find((player) => player.id === playerId);
            reconnectingGamePad === null || reconnectingGamePad === void 0 ? void 0 : reconnectingGamePad.setToConnected();
        };
        // emitter events
        this.emitRoomCode = () => {
            this.gameBoardSocket.emit("roomCreated", this.code);
        };
        this.emitPlayers = () => {
            this.gameBoardSocket.emit("players", Array.from(this.players.map((player) => player)));
        };
        this.emitNameTaken = () => {
            this.gameBoardSocket.emit("nameTaken");
        };
        this.code = roomCode;
        this.gameBoardSocket = gameBoardSocket;
        // put gameBoardSocket into room upon initialization
        this.gameBoardSocket.join(roomCode);
        // emit room code
        this.emitRoomCode();
    }
}
exports.Room = Room;
