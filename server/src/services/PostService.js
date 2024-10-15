const db = require("../models");
const { Op } = require("sequelize");

const getAllPost = (
  page,
  { priceNumber, areaNumber, filter, priceCode, areaCode }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order;
      if (filter === "default") {
        order = [["createdAt", "ASC"]];
      } else {
        order = [["createdAt", "DESC"]];
      }

      let queries = {};

      let offset = !page || +page <= 1 ? 0 : +page - 1;
      // if (priceNumber) queries.price = { [Op.between]: priceNumber };
      // if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };
      if (priceCode && priceCode !== "null") queries.priceCode = priceCode;
      if (areaCode && areaCode !== "null") queries.areaCode = areaCode;
      // console.log("querri ", queries);
      const posts = await db.Post.findAndCountAll({
        where: queries,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,

        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hastag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: ["id", "title", "star", "address", "description"],
        order,
      });
      resolve({
        status: posts ? "OK" : "ERR",
        limit: +process.env.limit,
        page: offset + 1,
        data: posts,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getLimitPost = (
  page,
  {
    categoryCode,
    priceNumber,
    areaNumber,
    filter,
    priceCode,
    areaCode,
    cityCode,
  }
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order;
      if (filter === "default") {
        order = [["createdAt", "ASC"]];
      } else {
        order = [["createdAt", "DESC"]];
      }

      let queries = {};

      let offset = !page || +page <= 1 ? 0 : +page - 1;
      // if (priceNumber) queries.price = { [Op.between]: priceNumber };
      // if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };
      if (categoryCode && categoryCode !== "null")
        queries.categoryCode = categoryCode;
      if (priceCode && priceCode !== "null") queries.priceCode = priceCode;
      if (areaCode && areaCode !== "null") queries.areaCode = areaCode;
      if (cityCode && cityCode !== "null") queries.cityCode = cityCode;

      const posts = await db.Post.findAndCountAll({
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,

        where: queries,
        attributes: ["id", "title", "star", "address", "description"],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hastag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        order,
      });

      resolve({
        status: posts ? "OK" : "ERR",
        limit: +process.env.limit,
        page: offset + 1,
        data: posts,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getNewPost = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(orderby);
      // let offset = !page || +page <= 1 ? 0 : +page - 1;
      // if (priceNumber) queries.price = { [Op.between]: priceNumber };
      // if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };
      const posts = await db.Post.findAll({
        // offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hastag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "createdAt",
        ],
      });
      resolve({
        status: posts ? "OK" : "ERR",
        // limit: +process.env.limit,
        // page: offset + 1,
        data: posts,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllPost,
  getLimitPost,
  getNewPost,
};
