const handleUserFavorites = (req, res, database) => {
  const { id } = req.params; //params -> from the url
  database("favorite_recipes")
    .where("id", id)
    .returning("*")
    .then((recipes) => res.json(recipes))
    .catch((err) =>
      res.status(400).json("unable to load your favorite recipes!")
    );
};

module.exports = {
  handleUserFavorites: handleUserFavorites,
};
