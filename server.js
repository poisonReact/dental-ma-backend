const express = require("express");
const app = express();
const cv = require("opencv4nodejs");
const path = require("path");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const fps = 15;
const wCap = new cv.VideoCapture(-1);

const PORT = 3001;

wCap.set(cv.CAP_PROP_FRAME_WIDTH, 320);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 240);

setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode(".jpg", frame).toString("base64");
  io.emit("image", image);
}, 1000 / fps);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
