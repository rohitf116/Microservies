const express = require("express");
// const cors = require("cors");
const { randomBytes } = require("crypto");
const { default: axios } = require("axios");

const app = express();
// app.use(cors());

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body.data;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    req.body.data.data.status = status;
    req.body.data.type = "CommentModerated";
    const data1 = req.body;

    await axios
      .post("http://localhost:4005/events", { ...data1 })
      .catch((err) => {
        console.log(err.message);
      });
  }
  res.send({ status: "OK" });
});

app.listen(4003, () => console.log("running moderatin"));
