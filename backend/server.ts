import ShortUniqueId from "short-unique-id";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

// create server
const ioServer = new Server(8080, {
  cors: {
    origin: ["http://localhost:4200", "http://192.168.0.103:4200"],
    methods: ["GET", "POST"],
  },
});

// create session id
// ioServer.engine.generateId = (req) => {
//   return uuidv4();
// };

// rooms
let rooms: string[] = [];

console.log(`\x1b[34m`, `Server is running...`);

// runs everytime a client connects
ioServer.on("connection", (socket) => {
  // join host
  socket.on("joinHost", () => {
    // socket = host
    // generate room code
    const roomCode = new ShortUniqueId({ length: 4 }).rnd().toUpperCase();
    // join host to room
    socket.join(roomCode);
    // store room
    rooms.push(roomCode);
    // display room code on host client for players
    socket.emit("roomCode", roomCode);
    console.log(`\x1b[32m`, `Host has been created in room: ${roomCode}`);

    // upon host leaving the room
    socket.on("disconnect", (reason: string) => {
      // remove room from rooms
      rooms = rooms.filter((r) => r !== roomCode);
      console.log(`\x1b[2m`, `Room with id: ${roomCode} has been closed.`);
    });
  });

  // join player
  socket.on(
    // socket = player
    "joinPlayer",
    (roomId: string, playerName: string) => {
      // find room with code given by player
      const room = rooms.find((roomCode) => roomCode === roomId);
      if (room === undefined) {
        console.log(`\x1b[31m`, `Room was not found.`);
      } else {
        socket.join(room);
        console.log(`\x1b[32m`, `${playerName} has joined to room: ${room}.`);
        ioServer.to(room).emit("newPlayer", playerName);
      }

      socket.on("ready", () => {
        console.log("ready");
      });
    }
  );
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
