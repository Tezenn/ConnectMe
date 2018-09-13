const express = require("express");
const app = express();
const cors = require("cors");

let users = [
  {
    position: { lat: 45.84, lng: 9.66 },
    visible: true,
    showInfo: false,
    name: "Tez"
  },
  {
    position: { lat: 45.86, lng: 9.61 },
    visible: true,
    showInfo: false,
    name: "julia"
  },
  {
    position: { lat: 45.84, lng: 9.56 },
    visible: true,
    showInfo: false,
    name: "Mao"
  }
];

app.use(cors());
let counter = 0;

app.get("/", (req, res) => {
  counter++;
  console.log("request incoming ", counter);
  res.send(users);
});

app.listen(3100, () => console.log("server on"));
