const handlePostFavorites = (req, res, database) => {
  const { id, recipe_name, recipe_url, recipe_image } = req.body;
  database("favorite_recipes")
    .returning("*") //returns every column after insert. Instead of selecting etc etc again.
    .insert({
      id: id,
      recipe_name: recipe_name,
      recipe_url: recipe_url,
      recipe_image: recipe_image,
    })
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((err) => res.status(400).json("unable to add recipe"));
};

module.exports = {
  handlePostFavorites: handlePostFavorites,
};
