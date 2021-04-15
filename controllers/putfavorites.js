const handlePostFavorites = (req, res, database) => {
  const { id, beer_name, beer_description, beer_image } = req.body;
  database("favorite_beers")
    .returning("*") //returns every column after insert. Instead of selecting etc etc again.
    .insert({
      id: id,
      beer_name: beer_name,
      beer_description: beer_description,
      beer_image: beer_image,
    })
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((err) => res.status(400).json("unable to add recipe"));
};

module.exports = {
  handlePostFavorites: handlePostFavorites,
};
