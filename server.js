const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const putfavorite = require("./controllers/putfavorites");
const userfavorites = require("./controllers/userfavorites");
const deletebeer = require("./controllers/deletebeer");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

//knex is to connect to the database
// always assign knex to a variable
const database = knex({
  client: "pg", //we are using postgres
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();

app.use(express.json()); //bodyparser has been deprecated. Is now on express
app.use(cors());

app.get("/", (req, res) => {
  res.send("success!!!");
});

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
  putfavorite.handlePostFavorites(req, res, database);
});

app.get("/favorites/:id", (req, res) => {
  userfavorites.handleUserFavorites(req, res, database);
});

app.delete("/favorites/:beer_id", (req, res) => {
  deletebeer.handleDeleteBeer(req, res, database);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
