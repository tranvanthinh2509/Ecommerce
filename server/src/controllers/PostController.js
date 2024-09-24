const { query } = require("express");
const PostService = require("../services/PostService");

const getAllPost = async (req, res) => {
  try {
    const { page, priceNumber = null, areaNumber = null } = req.query;
    const response = await PostService.getAllPost(page, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};
const getLimitPost = async (req, res) => {
  try {
    const {
      page,
      orderby,
      priceNumber = null,
      areaNumber = null,
      ...query
    } = req.query;

    const response = await PostService.getLimitPost(page, orderby, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};
const getNewPost = async (req, res) => {
  try {
    const { page, priceNumber = null, areaNumber = null, ...query } = req.query;

    console.log(req.query);
    const response = await PostService.getNewPost();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

module.exports = {
  getAllPost,
  getLimitPost,
  getNewPost,
};
