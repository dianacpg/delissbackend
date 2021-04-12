const bcrypt = require("bcrypt-nodejs");

const handleRegister = (req, res, database) => {
  //dont forget to inject the dependencies
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    //if user does not type information. To avoid empty register
    res.status(400).json("incorrect form submission!");
  }
  const hash = bcrypt.hashSync(password);
  database
    .transaction((trx) => {
      //we have to tables, one only with user details(id,name, email,joined), and the login table (email, hash) to protect from sharing the password
      //if we only do insert to register to user we do not save nothing on login table
      // so we are going to make a trasanction. First we are going to fill the login table
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email") //both have the email info
        .then((loginEmail) => {
          return trx("users") //then we are going to transact email to users and fill the other details
            .returning("*") //returns every column. Instead of selecting etc etc again
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit) //this means that if everything above is correct, commit this changes
        .catch(trx.rollback);
    })
    .catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister: handleRegister,
};
