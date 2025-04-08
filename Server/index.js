// index.js
const express = require("express");
const app = express();
const path = require("path");
const serveIndexHTML = (req, res, next) => {
  // `path.join()` constructs an absolute file from the arguments
  // `__dirname` provides the absolute path of the current module's parent directory.
  const filepath = path.join(__dirname, "../frontend/dist/index.html");
  res.sendFile(filepath);
};

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};
// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);

// Other endpoints and controllers

//endpoints
app.get("/api/picture", (req, res, next) => {
  const pic = [
    {
      src: "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg",
    },
  ];
  res.send(pic);
});
app.get("/api/joke", (req, res, next) => {
  const joke = [
    { setup: "Why was the broom late?", punchline: "It over-swept" },
  ];
  res.send(joke);
});
app.get("/api/rollDie", (req, res, next) => {
  const rollDie = () => {
    return Math.floor(Math.random() * 6) + 1;
  };
  let quantity = parseInt(req.query.quantity);

  const rolls = Array.from({ length: quantity }, rollDie);

  res.json({ rolls });
  //res.send(`rolls`);
});

const port = 8080;
app.get("/", serveIndexHTML);
// run the server application on port 8080 of the current host (http://localhost during development)
app.listen(port);
