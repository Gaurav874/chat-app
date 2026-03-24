const express = require("express");
const { app, server } = require("./config/socket.js");
// const app = express()
const cors = require("cors");
require("./config/cloudinary");
const path = require("path");

require("dotenv").config();
port = process.env.PORT || 3000;
// const __dirname = path.resolve();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const routes = require("./routes/signuproute");
const messageroutes = require("./routes/messageroute");

app.use("/api/v1/", routes);
app.use("/api/message/", messageroutes);

const dbConnect = require("./config/database");
dbConnect();

//eeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrooooooooooooooooooooooooooooooorrrrrrrrrrrrrrrrrrrrrrrrrrrrr
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");

  app.use(express.static(frontendPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

server.listen(port, function () {
  console.log(`server is started at port number ${port}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Heloo Jee</h1>`);
});
