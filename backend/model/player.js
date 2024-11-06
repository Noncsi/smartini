"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name) {
        this.isReady = false;
        this.score = 0;
        this.getScore = () => {
            return this.score;
        };
        this.add1PointToScore = () => {
            this.score++;
        };
        this.addPointsToScore = (points) => {
            this.score = this.score + points;
        };
        this.name = name;
    }
}
exports.Player = Player;
