const handleDeleteBeer = (req, res) => {
  const { recipe_id } = req.params;
  database("favorite_beers")
    .select("*")
    .where("beer_id", recipe_id)
    .del()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("unable to delete"));
};

module.exports = {
  handleDeleteBeer: handleDeleteBeer,
};
