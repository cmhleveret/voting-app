const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const userRouter = require("./routers/userRouter")
const pollRouter = require("./routers/pollRouter");

const { User } = require("./models/user");

const app = express();

// Serve static files from public folder (images, html, react js, etc)
app.use(express.static(path.join(__dirname, "public")));

// Select environment variables file
dotenv.config({
  path: path.join(__dirname, `${process.env.NODE_ENV}.env`),
});

// Enable cors for development purposes
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.json());

// Route(r)s here! ------------------------------
app.use("/user", userRouter);
app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  User.findOne({ token: authHeader }).then((user) => {
    if (!user) {
      res.sendStatus(403);
    } else next();
  });
});

app.use("/polls", pollRouter);
// ----------------------------------------------

// Handle React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port} in ${process.env.NODE_ENV}`);
    });
  });
