const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { raw } from "express";
import { v4 } from "uuid";
require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const registerUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, phone, password } = newUser;
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          phone,
          name,
          password: hashPassword(password),
          id: v4(),
        },
      });

      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token ? "Register is success" : "Phone is exist",
        token: token || null,
      });
    } catch (error) {
      reject(e);
    }
  });
};

const signInUser = (user) => {
  return new Promise(async (resolve, reject) => {
    const { phone, password } = user;
    try {
      const response = await db.User.findOne({
        where: { phone },
        raw: true,
      });

      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is success"
          : response
          ? "Password is wrong"
          : "Phone is not found",
        token: token || null,
      });
    } catch (error) {
      reject(e);
    }
  });
};

module.exports = {
  registerUser,
  signInUser,
};
