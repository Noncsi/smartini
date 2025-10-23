enum color {
  blue = "\x1b[34m",
  green = "\x1b[32m",
  red = "\x1b[31m",
}

export const Log = {
  info: {
    gameBoardDisconnected: (roomCode: string) =>
      console.log(color.blue, `Room ${roomCode} has been disconnected.`),
    playerDisconnected: (name: string) =>
      console.log(color.blue, `Player ${name} has been disconnected.`),
    serverIsRunning: (port: number) =>
      console.log(color.blue, `Server is running on port: ${port.toString()}.`),
  },
  success: {
    gameBoardCreated: (roomCode: string) =>
      console.log(color.green, `Room ${roomCode} has opened.`),
    playerJoined: (name: string, roomCode: string) =>
      console.log(color.green, `${name} has joined to room: ${roomCode}.`),
    playerReconnected: (name: string) =>
      console.log(color.green, `${name} has been reconnected.`),
  },
  error: {
    roomNotFound: () => console.log(color.red, `Room was not found.`),
    nameAlreadyTaken: (name: string) => console.log(color.red, `Name "${name}" is already taken.`),
  },
};
