const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");
const app = express();
app.use(cors());

app.use(express.json());
const post = {};
app.get("/posts", async (req, res) => {
  res.send(post);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body.data;

  if (type === "PostCreated") {
    const { id, title } = data;
    post[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    post[postId].comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const posts = post[postId];
    const comment = posts.comments.find((item) => item.id === id);
    comment.status = status;
    comment.content = content;
  }

  res.send({});
});
const port = 4002;
app.listen(port, () => console.log("running query on: ", port));
