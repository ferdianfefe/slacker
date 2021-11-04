const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const users = require("./routes/users");
const posts = require("./routes/posts");
const chats = require("./routes/chats");

/* User model */
const User = require("./model/User");

/* CORS middleware */
app.use(cors());

app.use(express.json());

// Mongodb connection
const { mongoURI } = require("./config/keys");
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (err) throw err;
    console.log("Database connection established");
  }
);

app.use(express.static(path.join(__dirname, "public")));

// Set routes
app.use("/users", users);
app.use("/posts", posts);
app.use("/chats", chats);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start app
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
// const io = socketio(server);
const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

/* Start socket io */
io.on("connection", (socket) => {
  /* When user is online */
  socket.on("online", (userId) => {
    User.updateOne({ _id: userId }, { isOnline: true }, (err, res) => {
      if (err) throw err;
      socket.broadcast.emit("online", userId);
    });
  });
  /* When user is offline */
  socket.on("offline", (userId) => {
    User.updateOne({ _id: userId }, { isOnline: false }, (err, res) => {
      if (err) throw err;
      socket.broadcast.emit("offline", userId);
    });
  });
  /* When user send message */
  socket.on("send-message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
