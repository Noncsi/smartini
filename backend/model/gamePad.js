"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePad = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
class GamePad {
    constructor(socket, roomCode, player) {
        this.setToConnected = () => {
            this.isConnectedToGame = true;
        };
        this.setToDisconnected = () => {
            this.isConnectedToGame = false;
        };
        this.socket = socket;
        this.roomCode = roomCode;
        this.player = player;
        this.id = new short_unique_id_1.default({ length: 10 }).rnd();
        this.isConnectedToGame = true;
        // join Pad to io room upon initialization
        this.socket.join(roomCode);
    }
}
exports.GamePad = GamePad;
