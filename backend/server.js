const WebSocket = require("ws");
const clientWs = new WebSocket.Server({ port: 8080 });
let counter = 0;
console.log("Server is running...");

const clients = new Map();

clientWs.on("connection", function connection(ws) {
  const id = counter++;
  console.log("Player connected", id);
  const color = Math.floor(Math.random() * 360);
  const metadata = { color, ws };

  clients.set(id, metadata);

  ws.on("message", function incoming(name) {
    console.log("Player received: %s", name);
    const message = JSON.parse(name);
    const metadata = clients.get(ws);

    // message.sender = metadata.id;
    // message.color = metadata.color;

    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((key) => {
      if (key === 0) {
        const a = clients.get(0);
        a.ws.send(outbound);
      }
    });
  });

  ws.on("close", function () {
    console.log("Player disconnected");
    clients.delete(ws);
  });
});
