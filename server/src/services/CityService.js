const db = require("../models");

require("dotenv").config();

const getAllCity = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.City.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      resolve({
        status: response ? "OK" : "ERR",
        data: response || null,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllCity,
};
