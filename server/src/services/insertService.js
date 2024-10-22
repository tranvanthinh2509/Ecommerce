const db = require("../models");
const bcrypt = require("bcrypt");
const { generateCode, generateCodeData } = require("../utils/generateCode");
const chothuecanho = require("../../data/chothuecanho.json");
const chothuematbang = require("../../data/chothuematbang.json");
const chothuephongtro = require("../../data/chothuephongtro.json");
const nhachothue = require("../../data/nhachothue.json");
// const dataBody = chothuecanho.body;

const allData = [
  {
    category: "CTCH",
    data: chothuecanho.body,
  },
  {
    category: "CTMB",
    data: chothuematbang.body,
  },
  {
    category: "CTPT",
    data: chothuephongtro.body,
  },
  {
    category: "NCT",
    data: nhachothue.body,
  },
];
const { dataArea, dataPrice } = require("../utils/data");
const { getNumberFromString } = require("../utils/common");
import { v4 } from "uuid";
require("dotenv").config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const insert = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provinceCodes = [];
      const labelCodes = [];
      {
        allData?.forEach((dataBody) => {
          dataBody?.data?.forEach(async (item) => {
            let postId = v4();
            let labelCode = generateCodeData(
              item?.overview?.content.find((i) => i.name === "Chuyên mục:")
                ?.content
            ).trim();
            labelCodes?.every((item) => item?.code !== labelCode) &&
              labelCodes.push({
                code: labelCode,
                value: item?.overview?.content
                  .find((i) => i.name === "Chuyên mục:")
                  ?.content.trim(),
              });
            let attributesId = v4();
            let userId = v4();
            let overviewId = v4();
            let imagesId = v4();

            let priceCurrent = getNumberFromString(
              item?.header?.attributes?.price
            );
            let areaCurrent = getNumberFromString(
              item?.header?.attributes?.acreage
            );

            let provinceCode = generateCodeData(
              item?.header?.address?.split(",")?.slice(-1)[0]
            ).trim();
            provinceCodes?.every((item) => item?.code !== provinceCode) &&
              provinceCodes.push({
                code: provinceCode,
                value: item?.header?.address?.split(",")?.slice(-1)[0].trim(),
              });
            await db.Post.create({
              id: postId,
              title: item?.header?.title,
              star: item?.header?.star,
              labelCode,
              address: item?.header?.address,
              attributesId,
              categoryCode: dataBody?.category,
              description: JSON.stringify(item?.mainContent?.content),
              userId,
              overviewId,
              imagesId,
              priceCode: dataPrice.find(
                (item) => item.max > priceCurrent && item.min <= priceCurrent
              )?.code,
              areaCode: dataArea.find(
                (item) => item.max > areaCurrent && item.min <= areaCurrent
              )?.code,
              cityCode: provinceCode,
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

            await db.Overview.create({
              id: overviewId,
              code: item?.overview?.content.find((i) => i.name === "Mã tin:")
                ?.content,
              area: item?.overview?.content.find((i) => i.name === "Khu vực")
                ?.content,
              type: item?.overview?.content.find(
                (i) => i.name === "Loại tin rao:"
              )?.content,
              target: item?.overview?.content.find(
                (i) => i.name === "Đối tượng thuê:"
              )?.content,
              bonus: item?.overview?.content.find((i) => i.name === "Gói tin:")
                ?.content,
              created: item?.overview?.content.find(
                (i) => i.name === "Ngày đăng:"
              )?.content,
              expire: item?.overview?.content.find(
                (i) => i.name === "Ngày hết hạn:"
              )?.content,
            });

            await db.User.create({
              id: userId,
              name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
                ?.content,
              password: hashPassword("123456"),
              phone: item?.contact?.content.find(
                (i) => i.name === "Điện thoại:"
              )?.content,
              zalo: item?.contact?.content.find((i) => i.name === "Zalo")
                ?.content,
              role: "3",
            });
          });
        });
      }

      provinceCodes?.forEach(async (item) => {
        await db.City.create(item);
      });

      labelCodes?.forEach(async (item) => {
        await db.Label.create(item);
      });
      resolve("Done");
    } catch (error) {
      reject(error);
    }
  });
};

// createPricesAndAreas;

// const insert = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       dataPrice.forEach(async (item, index) => {
//         await db.Price.create({
//           code: generateCodeData(item.value),
//           value: item.value,
//           order: index + 1,
//           min: item.min,
//           max: item.max,
//         });
//       });
//       dataArea.forEach(async (item, index) => {
//         await db.Area.create({
//           code: generateCodeData(item.value),
//           value: item.value,
//           order: index + 1,
//           min: item.min,
//           max: item.max,
//         });
//       });
//       resolve("OK");
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

module.exports = {
  insert,
};
