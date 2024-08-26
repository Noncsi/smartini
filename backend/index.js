"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 8080;
const serverOptions = {
  cors: {
    origin: [
      "http://localhost:4300",
      "http://192.168.0.103:4300",
      "http://localhost:4200",
      "http://192.168.0.103:4200",
    ],
  },
};
(0, app_1.createServer)(port, serverOptions);
