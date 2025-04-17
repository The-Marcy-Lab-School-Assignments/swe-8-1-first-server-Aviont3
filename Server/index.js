// index.js
const express = require("express");
const app = express();
// const path = require("path");

// const serveIndexHTML = (req, res, next) => {
//   // `path.join()` constructs an absolute file from the arguments
//   // `__dirname` provides the absolute path of the current module's parent directory.
//   const filepath = path.join(__dirname, "../frontend/dist/index.html");
//   res.sendFile(filepath);
// };

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

app.use(logRoutes);
//path
// The path module is useful for constructing relative filepaths
const path = require("path");

// the filepath is to the entire assets folder
const filepath = path.join(__dirname, "../frontend/dist");

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// other controllers
const servePic = (req, res, next) => {
  // const pic = [
  //   {
  //     src: "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg",
  //   },
  // ];
  // res.send(pic);
  res.send({
    src: "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg",
  });
};

const serveJoke = (req, res, next) => {
  const joke = [
    { setup: "Why was the broom late?", punchline: "It over-swept" },
  ];
  res.send(joke);
};
const serveRoll = (req, res, next) => {
  const rollDie = () => {
    return Math.floor(Math.random() * 6) + 1;
  };
  let quantity = parseInt(req.query.quantity);

  const rolls = Array.from({ length: quantity }, rollDie);

  res.json({ rolls });
  //res.send(`rolls`);
};

//endpoints
app.get("/api/picture", servePic);

app.get("/api/joke", serveJoke);
app.get("/api/rollDie", serveRoll);

//controller

const port = 8080;
// app.get("/", serveIndexHTML);
// run the server application on port 8080 of the current host (http://localhost during development)
app.listen(port);
