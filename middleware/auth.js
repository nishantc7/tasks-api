"use strict";
const bcrypt = require("bcrypt");
const basicAuth = require("basic-auth");
const { user } = require("../models");

module.exports = async (req, res, next) => {
  const credentials = basicAuth(req);
  let message;
  if (credentials) {
    const authUser = await user.findOne({
      where: {
        username: credentials.name,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (authUser) {
      const authenticated = await bcrypt.compare(
        credentials.pass,
        authUser.password
      );
      if (authenticated) {
        req.user = authUser;
      } else {
        message = `Authentication failure for username: ${credentials.name}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "No credentials provided";
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: message });
  } else {
    next();
  }
};
