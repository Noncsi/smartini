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
        serverIsRunning: () => console.log(color.blue, `Server is running...`),
    },
    success: {
        gameBoardCreated: (roomCode) => console.log(color.green, `Host has been created in room: ${roomCode}`),
        playerJoined: (name, roomCode) => console.log(color.green, `${name} has joined to room: ${roomCode}.`),
    },
    error: { roomNotFound: () => console.log(color.red, `Room was not found.`) },
};
