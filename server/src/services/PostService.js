const db = require("../models");
const { Op, where } = require("sequelize");
const { generateCodeData } = require("../utils/generateCode");
import { v4 } from "uuid";
import generateDate from "../utils/generateDate";

const createPost = (
  categoryCode,
  title,
  category,
  priceNumber,
  areaNumber,
  image,
  address,
  priceCode,
  areaCode,
  description,
  target,
  province,
  label,
  userId
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashtag = Math.floor(Math.random() * 10000000);
      let labelCode = generateCodeData(label).trim();
      let provinceCode = province?.includes("Thành phố")
        ? generateCodeData(province?.replace("Thành phố ", ""))
        : generateCodeData(province?.replace("Tỉnh ", ""));

      let attributesId = v4();
      let overviewId = v4();
      let imagesId = v4();
      let currentDate = generateDate();

      await db.Post.create({
        id: v4(),
        title: title,
        labelCode: labelCode,
        address: address,
        attributesId,
        categoryCode: categoryCode,
        description: JSON.stringify(description),
        userId,
        overviewId,
        imagesId,
        priceCode,
        areaCode,
        cityCode: provinceCode,
      });

      await db.Attribute.create({
        id: attributesId,
        price: priceNumber,
        acreage: areaNumber,
        hastag: hashtag,
      });

      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(image),
      });

      await db.Overview.create({
        id: overviewId,
        code: "#" + hashtag,
        area: label,
        type: category,
        target: target,
        bonus: "Tin thường",
        created: currentDate.today,
        expire: currentDate.expireDay,
      });

      await db.City.findOrCreate({
        where: {
          [Op.or]: [
            {
              value: province?.replace("Thành phố ", ""),
            },
            {
              value: province?.replace("Tỉnh ", ""),
            },
          ],
        },
        defaults: {
          code: provinceCode,
          value: province?.includes("Thành phố")
            ? province?.replace("Thành phố ", "")
            : province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: label,
        },
      });

      resolve({
        status: "OK",
        msg: "Create post success!",
      });
    } catch (error) {
      reject(error);
    }
  });
};

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

const getLimitAdmin = (page, { categoryCode, filter, cityCode }) => {
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

      if (categoryCode && categoryCode !== "null")
        queries.categoryCode = categoryCode;

      if (cityCode && cityCode !== "null") queries.cityCode = cityCode;

      const posts = await db.Post.findAndCountAll({
        offset: offset * +process.env.LIMITADMIN,
        limit: +process.env.LIMITADMIN,

        where: queries,
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hastag"],
          },
          {
            model: db.Overview,
            as: "overviews",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        order,
      });

      resolve({
        status: posts ? "OK" : "ERR",
        limit: +process.env.LIMITADMIN,
        page: offset + 1,
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
  createPost,
  getLimitAdmin,
};
