const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");
const app = express();
app.use(cors());

app.use(express.json());
const posts = {};
app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title };
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };
  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: { id, title },
      config,
    });
  } catch (error) {
    console.log(error);
  }

  res.send(posts[id]);
});

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  res.send({});
});

app.listen(4000, () => console.log("running post"));
