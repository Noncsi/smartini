import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

// create server
const ioServer = new Server(8080, {
  cors: {
    origin: ["http://localhost:4200", "http://192.168.0.103:4200"],
    methods: ["GET", "POST"],
  },
});

// create session id
ioServer.engine.generateId = (req) => {
  return uuidv4();
};

// host client socket
let hostClientSocket: Socket;

console.log("Server is running...");

ioServer.on("connection", (socket) => {
  socket.on("joinHost", () => {
    hostClientSocket = socket;
    console.log("Host has been created.");
  });
  socket.on("joinPlayer", (socketId: string, playerName: string) => {
    console.log(`${playerName} has joined.`);
    hostClientSocket.emit("displayNewPlayerOnHost", playerName);
  });
  console.log("data", socket.data);
  console.log("Number of players in lobby:", ioServer.engine.clientsCount);

  // socket.on("disconnect", (reason: string) => {
  //   console.log(`Player with id: ${socket.id} left the lobby.`);
  //   console.log("Number of players in lobby:", ioServer.engine.clientsCount);
  // });
});

// let counter = 0;
// const clients = new Map();
// clientWs.on("connection", function connection(ws: any) {
//   const id = counter++;
//   console.log("Player connected", id);
//   const color = Math.floor(Math.random() * 360);
//   const metadata = { color, ws };

//   clients.set(id, metadata);

//   ws.on("message", function incoming(name: any) {
//     console.log("Player received: %s", name);
//     const message = JSON.parse(name);
//     const metadata = clients.get(ws);

//     // message.sender = metadata.id;
//     // message.color = metadata.color;

//     const outbound = JSON.stringify(message);

//     [...clients.keys()].forEach((key) => {
//       if (key === 0) {
//         const a = clients.get(0);
//         a.ws.send(outbound);
//       }
//     });
//   });

//   ws.on("close", function () {
//     console.log("Player disconnected");
//     clients.delete(ws);
//   });
// });
