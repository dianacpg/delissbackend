# Deliss

Deliss is an automatic weekly meal plan generator app that gives you meal ideas for breakfast, lunch and dinner. 3 recipes for each day of the week! You can also save your favorite recipes in your acount.

Live demo: https://deliss.netlify.app/

## Features:

- [x] Use of EDAMAME public API;
- [x] Weekly meal plans for breakfast, lunch and dinner;
- [x] Random recipe combinations for meal plan;
- [x] Personalized meal plans for Vegetarians and Vegans;
- [x] Login and Register Authentication made by scrach;
- [x] User database for favorite recipes;

## Build with:

- JavaScript - React (create react app);
- CSS, Tachyons;
- EDAMAME recipe serch API;
- Node.js, Express.js;
- PostgreSQL;
- Deployment: Backend- Heroku, Frontend- Netlify;

## Setup

#### To run this project:

- Install Nodejs;
- Then:

```
$ git clone git@github.com:dianacpg/delissbackend.git
$ cd your-project/
$ npm install
$ npm start

```

- Your Database should follow this schema:

Table user:
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name character varying(100),
email text NOT NULL UNIQUE,
joined timestamp without time zone NOT NULL
);

Table login:
CREATE TABLE login (
id SERIAL PRIMARY KEY,
hash character varying(100) NOT NULL,
email text NOT NULL UNIQUE
);

Table favoripe_recipes:
CREATE TABLE favorite_recipes (
recipe_id SERIAL PRIMARY KEY,
id character varying(300) NOT NULL,
recipe_name character varying(200),
recipe_url character varying(200) NOT NULL,
recipe_image character varying(200) NOT NULL
);

- Set your database on server:

```
const database = knex({
  client: "pg"
  connection: {
    host: "127.0.0.1",
    user: "youruser",
    password: "",
    database: "yourdb",
  },
});
```

![Alt Text](https://media.giphy.com/media/lKQ4k6JMgf1OoeIcVf/giphy.gif)
