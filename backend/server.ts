import ShortUniqueId from "short-unique-id";
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
// ioServer.engine.generateId = (req) => {
//   return uuidv4();
// };

// rooms
const rooms: string[] = [];

console.log("Server is running...");

// runs everytime a client connects
ioServer.on("connection", (socket) => {
  // join host
  socket.on("joinHost", () => {
    // generate room code
    const roomCode = new ShortUniqueId({ length: 4 }).rnd();
    // join host to room
    socket.join(roomCode);
    rooms.push(roomCode);
    console.log(`Host has been created in room: ${roomCode}`);
  });

  // join player
  socket.on(
    "joinPlayer",
    (socketId: string, roomId: string, playerName: string) => {
      console.log(rooms);
      // find room with code given by player
      const room = rooms.find((roomCode) => roomCode === roomId);
      if (room === undefined) {
        console.log(`Room was not found.`);
      } else {
        socket.join(room);
        console.log(`${playerName} has joined to room: ${room}.`);
        ioServer.to(room).emit("newPlayer", playerName);
      }
    }
  );

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
