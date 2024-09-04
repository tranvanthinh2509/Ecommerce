const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { raw } from "express";
import { v4 } from "uuid";
require("dotenv").config();
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

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
          role: "3",
          id: v4(),
        },
      });

      resolve({
        status: response[1] ? "OK" : "ERR",
        msg: response[1] ? "Register is success" : "Phone is exist",
        data: response[0] || null,
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
      const checkUser = await db.User.findOne({
        where: { phone },
        raw: true,
      });

      if (checkUser === null) {
        resolve({ status: "ERR", message: "The user is not defined" });
      }

      const isCorrectPassword = bcrypt.compareSync(
        password,
        checkUser.password
      );

      if (!isCorrectPassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }

      const access_token = await generalAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.role,
      });
      const refresh_token = await generalRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.role,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
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
