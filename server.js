const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const postfavorite = require("./controllers/postfavorites");
const userfavorites = require("./controllers/userfavorites");

//knex is to connect to the database
// always assign knex to a variable
const database = knex({
  client: "pg", //we are using postgres
  connection: {
    host: "127.0.0.1",
    user: "lorennav",
    password: "",
    database: "fooddb",
  },
});

const app = express();

app.use(express.json()); //bodyparser has been deprecated. Is now on express
app.use(cors());

app.get("/signin", (req, res) => {
  res.send("success!");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, database);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, database); //dont forget to inject dependencies
});

app.get("/profile/:id", (req, res) => {
  profile.handleGetProfile(req, res, database);
});

app.put("/favorites", (req, res) => {
  postfavorite.handlePostFavorites(req, res, database);
});

app.get("/favorites/:id", (req, res) => {
  userfavorites.handleUserFavorites(req, res, database);
});

app.delete("/favorites/:recipe_id", (req, res) => {
  const { recipe_id } = req.params;
  database("favorite_recipes")
    .select("*")
    .where("recipe_id", recipe_id)
    .del()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("unable to delete"));
});

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
