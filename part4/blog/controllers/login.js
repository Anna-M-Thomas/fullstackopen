const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const user = await User.findOne({ username: body.username });

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);

    if (!passwordCorrect || !user) {
      return response
        .status(401)
        .json({ error: "Password or username incorrect" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, id: user._id, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
