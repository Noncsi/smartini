"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const player_1 = require("./player");
const gamePad_1 = require("./gamePad");
var GameStage;
(function (GameStage) {
    GameStage[GameStage["lobby"] = 0] = "lobby";
    GameStage[GameStage["game"] = 1] = "game";
})(GameStage || (GameStage = {}));
class Room {
    constructor(roomCode, gameBoardSocket) {
        this.stage = GameStage.lobby;
        this.isPaused = false;
        this.gamePads = [];
        this.addGamePad = (socket, name) => {
            const isNameTaken = this.gamePads.some((gamePad) => gamePad.player.name === name);
            if (isNameTaken) {
                this.emitNameTaken();
            }
            else {
                this.gamePads.push(new gamePad_1.GamePad(socket, this.code, new player_1.Player(name)));
                this.emitPlayers();
            }
        };
        this.reconnectGamePad = (playerId) => {
            const reconnectingGamePad = this.gamePads.find((gamePad) => gamePad.id === playerId);
            reconnectingGamePad === null || reconnectingGamePad === void 0 ? void 0 : reconnectingGamePad.setToConnected();
        };
        // emitter events
        this.emitRoomCode = () => {
            this.gameBoardSocket.emit("roomCreated", this.code);
        };
        this.emitPlayers = () => {
            this.gameBoardSocket.emit("players", Array.from(this.gamePads.map((gamePad) => gamePad.player)));
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
