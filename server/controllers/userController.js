const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT);

const { User } = require("../models/user");

const validLoginInputs = (req) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return false;
  }

  return true;
};

const validSignupInputs = (req) => {
  const { username, password, passwordConfirmation } = req.body;

  if (!username || !password || !passwordConfirmation) {
    return false;
  }

  if (username.length < 2) {
    return false;
  }

  if (username.toLowerCase() !== username) {
    return false;
  }

  if (!/^[a-z_]*$/.test(username)) {
    return false;
  }

  if (password.length < 8) {
    return false;
  }

  if (password.toLowerCase() == password) {
    return false;
  }

  if (password.toUpperCase() == password) {
    return false;
  }

  //pretty sure this needs to be testing password, not username?
  if (!/\d/g.test(password)) {
    return false;
  }

  if (password !== passwordConfirmation) {
    return false;
  }

  return true;
};

exports.login = function (req, res, next) {
  if (validLoginInputs(req)) {
    //then do the login
    User.findOne({ userName: req.body.username })
      .then((user) => {
        if (!user) {
          console.log("User not found in database, no.");
          return; //an error
        } else {
          return bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
              if (!result) {
                return res.sendStatus(403);
              } else {
                user.token = uuidv4();
                return user.save().then(() => {
                  res.send({ token: user.token, userid: user._id })
                });
              }
            });
        }
      })
      // .then((user) => {
      //     res.send({ token: user.token });
      // });
  } else {
    return next(createError(400, "Valid login not found. stop it"));
  }
};

exports.signup = function (req, res, next) {
  if (validSignupInputs(req)) {
    //sign them up scotty
    const { username, password } = req.body;
    User.findOne({ userName: username })
      .then((user) => {
        if (user) {
          console.log("User already exists with that name");
          return; //error here
        } else {
          //make the new user here
          return bcrypt.hash(password, saltRounds).then((hash) => {
            const newUser = User({
              userName: username,
              password: hash,
              admin: false,
              token: uuidv4(),
            });
            //save newUser to the database
            return newUser.save();
          });
        }
      })
      .then((user) => {
        res.send({ result: "success", token: user.token, userid: user._id });
      });
  } else {
    return next(createError(400, "Valid signup not made. stop it"));
  }
};

module.exports.validLoginInputs = validLoginInputs;
module.exports.validSignupInputs = validSignupInputs;
