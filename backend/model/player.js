"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(socket, name) {
        this.isReady = false;
        this._score = 0;
        this.getScore = () => {
            return this._score;
        };
        this.add1PointToScore = () => {
            this._score++;
        };
        this.addPointsToScore = (points) => {
            this._score = this._score + points;
        };
        this._socket = socket;
        this._name = name;
    }
}
exports.Player = Player;
