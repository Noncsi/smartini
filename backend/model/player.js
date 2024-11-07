"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
class Player {
    constructor(socket, roomCode, name) {
        this.isReady = false;
        this.score = 0;
        this.setToConnected = () => {
            this.isConnectedToGame = true;
        };
        this.setToDisconnected = () => {
            this.isConnectedToGame = false;
        };
        this.getScore = () => {
            return this.score;
        };
        this.add1PointToScore = () => {
            this.score++;
        };
        this.addPointsToScore = (points) => {
            this.score = this.score + points;
        };
        this.socket = socket;
        this.roomCode = roomCode;
        this.name = name;
        this.id = new short_unique_id_1.default({ length: 10 }).rnd();
        this.isConnectedToGame = true;
        // join player to io room upon initialization
        this.socket.join(roomCode);
    }
}
exports.Player = Player;
