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

database
  .select("*")
  .from("users")
  .then((data) => {
    console.log(data);
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

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
/ --> this is workin
/signin --> POST = success/fail (NOT PUT - sends in querystring. We want to send insidebody)
/register --> POST = user
/profile/userID -> GET = user
/recipe --> PUT -> user

*/