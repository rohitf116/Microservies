const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();
app.use(cors());

app.use(express.json());
const posts = {};
app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const id = randomBytes(4).toString("hex");
  comments = posts[req.params.id] || [];
  comments.push({ id, content, status: "pending" });
  posts[req.params.id] = comments;
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    headers,
  };

  await axios.post(
    "http://localhost:4005/events",
    {
      type: "CommentCreated",
      data: { id, content, postId: req.params.id, status: "pending" },
    },
    config
  );
  res.send(posts[req.params.id]);
});

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  console.log(posts, id);
  res.send(posts[id] || []);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body.data.data;
  if (type === "CommentModerated") {
    const { id, content, postId, status } = data;
    console.log(data, "commentMde");
    const comments = posts[postId];
    console.log(comments, "commentMde");
    const comment = comments.find((item) => item.id === id);
    comment.status = status;
    console.log({ data: { id, content, postId, status } }, "commentMde");
    const headers = {
      "Content-Type": "application/json",
    };
    const config = {
      headers,
    };

    await axios.post(
      "http://localhost:4005/events",
      {
        type: "CommentUpdated",
        data: { id, content, postId, status },
      },
      config
    );
  }
  res.send({});
});

app.listen(4001, () => console.log("running comments"));
