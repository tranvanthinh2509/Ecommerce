const db = require("../models");
const bcrypt = require("bcrypt");
const { generateCode } = require("../utils/generateCode");
const chothuecanho = require("../../data/chothuecanho.json");
const chothuematbang = require("../../data/chothuematbang.json");
const chothuephongtro = require("../../data/chothuephongtro.json");
const nhachothue = require("../../data/nhachothue.json");
const dataBody = chothuecanho.body;
import { v4 } from "uuid";
require("dotenv").config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const insert = () => {
  return new Promise(async (resolve, reject) => {
    try {
      dataBody.forEach(async (item) => {
        let postId = v4();
        let labelCode = generateCode(4);
        let attributesId = v4();
        let userId = v4();
        let overviewId = v4();
        let imagesId = v4();
        await db.Post.create({
          id: postId,
          title: item?.header?.title,
          star: item?.header?.star,
          labelCode,
          address: item?.header?.address,
          attributesId,
          categoryCode: "CTCH",
          description: JSON.stringify(item?.mainContent?.content),
          userId,
          overviewId,
          imagesId,
        });

        await db.Attribute.create({
          id: attributesId,
          price: item?.header?.attributes?.price,
          acreage: item?.header?.attributes?.acreage,
          published: item?.header?.attributes?.published,
          hastag: item?.header?.attributes?.hashtag,
        });

        await db.Image.create({
          id: imagesId,
          image: JSON.stringify(item?.images),
        });

        await db.Label.create({
          code: labelCode,
          value: item?.overview?.content.find((i) => i.name === "Chuyên mục:")
            ?.content,
        });

        await db.Overview.create({
          id: overviewId,
          code: item?.overview?.content.find((i) => i.name === "Mã tin:")
            ?.content,
          area: item?.overview?.content.find((i) => i.name === "Khu vực")
            ?.content,
          type: item?.overview?.content.find((i) => i.name === "Loại tin rao:")
            ?.content,
          target: item?.overview?.content.find(
            (i) => i.name === "Đối tượng thuê:"
          )?.content,
          bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
            ?.content,
          created: item?.overview?.content.find((i) => i.name === "Ngày đăng:")
            ?.content,
          expire: item?.overview?.content.find(
            (i) => i.name === "Ngày hết hạn:"
          )?.content,
        });

        await db.User.create({
          id: userId,
          name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
            ?.content,
          password: hashPassword("123456"),
          phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
            ?.content,
          zalo: item?.contact?.content.find((i) => i.name === "Zalo")?.content,
          role: "3",
        });
      });
      resolve("Done");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  insert,
};
