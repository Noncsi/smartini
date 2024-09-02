enum color {
  blue = "\x1b[34m",
  green = "\x1b[32m",
  red = "\x1b[31m",
}

export const Log = {
  info: {
    serverIsRunning: (port: number) =>
      console.log(color.blue, `Server is running on port: ${port.toString()}.`),
  },
  success: {
    gameBoardCreated: (roomCode: string) =>
      console.log(color.green, `Host has been created in room: ${roomCode}`),
    playerJoined: (name: string, roomCode: string) =>
      console.log(color.green, `${name} has joined to room: ${roomCode}.`),
  },
  error: { roomNotFound: () => console.log(color.red, `Room was not found.`) },
};
