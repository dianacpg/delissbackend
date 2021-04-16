# Deliss Beer

Deliss Beer is an Automatic Beer and Food Match Generator that gives
you the most suitable craft beer for your meal. You will find
options for meat, fish and veggie meals! Discover craft beers from
all around the world! You can also save your favorites in
your acount.

Live demo: https://deliss.netlify.app/

## Features:

- [x] Use of Punk Api public API;
- [x] Beers suitable for meat, fish and veggie meals;
- [x] Random display of 4 beers from each beer-food-match category;
- [x] Filter option for Alcohol by volume;
- [x] Login and Register Authentication made by scratch;
- [x] User database for favorite beers;

## Build with:

- JavaScript - React (create react app);
- CSS, Tachyons;
- Punk API;
- Node.js, Express.js;
- PostgreSQL;
- Deployment: Backend- Heroku, Frontend- Netlify;

## Project architecture:

```
|-server.js     - Route
|-controllers/  - Controller functions for requests

```

## Note:

-The Punk API takes Brewdog's DIY Dog and turns it into a searchable, filterable API that's completely free and open source.

- The API doesn't have links for more details of each beer.

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

CREATE TABLE favorite_beers (
beer_id SERIAL PRIMARY KEY,
id character varying(300) NOT NULL,
beer_name character varying(200) NOT NULL,
beer_description character varying(200),
beer_image character varying(200)
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

** The front end part of Deliss App [here](https://github.com/dianacpg/deliss_beer) **

![Alt Text](https://media.giphy.com/media/3o85xjSETVG3OpPyx2/giphy.gif)
