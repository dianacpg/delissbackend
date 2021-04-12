const bcrypt = require("bcrypt-nodejs");

const handleSignin = (req, res, database) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //if user does not type information. To avoid empty signin
    res.status(400).json("incorrect form submission!");
  }
  database
    .select("email", "hash")
    .from("login")
    .where("email", "=", email) //lets see if the email is on the database
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return database
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            console.log(user);
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong email or password");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};
