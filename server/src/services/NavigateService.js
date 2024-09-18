const { raw } = require("body-parser");
const db = require("../models");

const navigate = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Category.findAll({
        attributes: ["code", "value", "header", "subheader"],
        raw: true,
      });
      resolve({
        status: data ? "OK" : "ERR",
        data: data || null,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  navigate,
};
