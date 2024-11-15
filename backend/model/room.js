"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
            if (this.players.some((player) => player.name === name)) {
                this.emitNameTaken();
                return null;
            }
            const newPlayer = new player_1.Player(socket, this.code, name);
            this.players.push(newPlayer);
            this.emitPlayers();
            return newPlayer;
        };
        this.reconnectPlayer = (playerId) => {
            const reconnectingPlayer = this.players.find((player) => player.id === playerId);
            reconnectingPlayer === null || reconnectingPlayer === void 0 ? void 0 : reconnectingPlayer.setToConnected();
        };
        // emitter events
        this.emitRoomCode = () => {
            this.gameBoardSocket.emit("roomCreated", this.code);
        };
        this.emitPlayers = () => {
            this.gameBoardSocket.emit("players", this.players.map((_a) => {
                var { socket } = _a, obj = __rest(_a, ["socket"]);
                return obj;
            }));
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
