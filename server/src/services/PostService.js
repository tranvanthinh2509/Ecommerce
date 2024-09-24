const db = require("../models");
const { Op } = require("sequelize");

const getAllPost = (page, { priceNumber, areaNumber }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      if (priceNumber) queries.price = { [Op.between]: priceNumber };
      if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };
      const posts = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
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

const getLimitPost = (page, orderby, query, { priceNumber, areaNumber }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      const queries = { ...query };
      if (priceNumber) queries.price = { [Op.between]: priceNumber };
      if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };
      let posts;

      posts = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        limit: +process.env.LIMIT,
        where: queries,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hastag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
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
        raw: true,
        nest: true,
        // offset: offset * +process.env.LIMIT,
        // limit: +process.env.LIMIT,
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
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        // status: posts ? "OK" : "ERR",
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
