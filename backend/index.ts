import { ServerOptions } from "socket.io";
import { createServer } from "./app";

const port: number = 8080;
const serverOptions: Partial<ServerOptions> = {
  cors: {
    origin: [
      "http://localhost:4300",
      "http://192.168.0.103:4300",
      "http://localhost:4200",
      "http://192.168.0.103:4200",
    ],
  },
};

createServer(port, serverOptions);
