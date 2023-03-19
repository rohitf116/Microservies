const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const { default: axios } = require("axios");

const app = express();
app.use(cors());

app.use(express.json());
const posts = {};
app.post("/events", (req, res) => {
  const { body } = req.body;
  //   console.log(event, req.body);
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  console.log(req.body);
  axios
    .post("http://localhost:4000/events", { data: req["body"] })
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://localhost:4001/events", { data: req["body"] })
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://localhost:4002/events", { data: req["body"] })
    .catch((err) => {
      console.log(err.message);
    });
  axios
    .post("http://localhost:4003/events", { data: req["body"] })
    .catch((err) => {
      console.log(err.message);
    });
  res.send({ status: "OK" });
});

app.listen(4005, () => console.log("running event bus"));
