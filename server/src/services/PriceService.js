const db = require("../models");

require("dotenv").config();

const getAllPrice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Price.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["order", "ASC"]],
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
  getAllPrice,
};
