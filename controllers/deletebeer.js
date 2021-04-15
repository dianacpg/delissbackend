const handleDeleteBeer = (req, res, database) => {
  const { beer_id } = req.params;
  database("favorite_beers")
    .select("*")
    .where("beer_id", beer_id)
    .del()
    .then((beers) => res.json(beers))
    .catch((err) => res.status(400).json("unable to delete"));
};

module.exports = {
  handleDeleteBeer: handleDeleteBeer,
};
