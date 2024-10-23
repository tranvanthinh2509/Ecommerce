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
      reject(error);
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
        resolve({ status: "ERR", msg: "The user is not defined" });
      }

      const isCorrectPassword = bcrypt.compareSync(
        password,
        checkUser.password
      );

      if (!isCorrectPassword) {
        resolve({
          status: "ERR",
          msg: "The password or user is incorrect",
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
        msg: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const detailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: id },
      });

      resolve({
        status: user?.dataValues ? "OK" : "ERR",
        data: user?.dataValues || null,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (id, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const respone = await db.User.update(payload, {
        where: { id: id },
      });
      resolve({
        status: respone[0] > 0 ? "OK" : "ERR",
        msg: respone[0] > 0 ? "Update" : "Failer to update user",
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  registerUser,
  signInUser,
  detailUser,
  updateUser,
};
