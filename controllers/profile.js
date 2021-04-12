const handleGetProfile = (req, res, database) => {
  const { id } = req.params; //params -> from the url
  database
    .select("*")
    .from("users")
    .where({ id }) //({id})= id:id // where selects everything * from users where id = id.params
    .then((user) => {
      console.log(user);
      if (user.length) {
        //this is to avoid returning empty array
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((err) => res.status(400).json("error getting user"));
};

module.exports = {
  handleGetProfile: handleGetProfile,
};
