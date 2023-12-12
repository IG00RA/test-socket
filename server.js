const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 }, () => {
  console.log("Server started");
});

wss.on("connection", (ws) => {
  console.log("New connection");
  ws.on("message", (data) => {
    console.log(data);
    ws.send(data);
  });
});

wss.on("listening", () => {
  console.log("Server is listening on port 3001");
});
