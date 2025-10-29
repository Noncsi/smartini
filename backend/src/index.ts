import { ServerOptions } from "socket.io";
import { createServer } from "./app";
import { PORT } from "../../shared/constants";

const serverOptions: Partial<ServerOptions> = {
  cors: {
    origin: [
      "https://admin.socket.io",
      "http://localhost:4201",
      "http://192.168.0.103:4201",
      "http://localhost:4200",
      "http://192.168.0.103:4200",
    ],
    credentials: true,
  },
};

createServer(PORT, serverOptions);
