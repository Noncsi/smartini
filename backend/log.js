"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
var color;
(function (color) {
    color["blue"] = "\u001B[34m";
    color["green"] = "\u001B[32m";
    color["red"] = "\u001B[31m";
})(color || (color = {}));
exports.Log = {
    info: {
        gameBoardDisconnected: (roomCode) => console.log(color.blue, `Room ${roomCode} has been disconnected.`),
        gamePadDisconnected: (name) => console.log(color.blue, `Player ${name} has been disconnected.`),
        serverIsRunning: (port) => console.log(color.blue, `Server is running on port: ${port.toString()}.`),
    },
    success: {
        gameBoardCreated: (roomCode) => console.log(color.green, `Room ${roomCode} has opened.`),
        playerJoined: (name, roomCode) => console.log(color.green, `${name} has joined to room: ${roomCode}.`),
        playerReconnected: (name) => console.log(color.green, `${name} has been reconnected.`),
    },
    error: { roomNotFound: () => console.log(color.red, `Room was not found.`) },
};
