import { Server, ServerOptions } from "socket.io";
import { connectGameBoard, connectGamePad } from "./eventHandlers";

export const createServer = (
  port: number,
  serverOptions: Partial<ServerOptions> = {}
) => {
  const ioServer = new Server(port, serverOptions);

  ioServer.on("connection", (socket) => {
    socket.on("connectGameBoard", () => connectGameBoard(socket));
    socket.on("disconnect", () => {});
    socket.on("connectGamePad", (roomCode: string, playerName: string) =>
      connectGamePad(socket, roomCode, playerName)
    );
  });

  console.log(`\x1b[34m`, `Server is running...`);
};
