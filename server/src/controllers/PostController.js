const { query } = require("express");
const PostService = require("../services/PostService");

const createPost = async (req, res) => {
  try {
    const {
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
      userId,
    } = req.body;
    console.log(req.body);

    if (
      !title ||
      !categoryCode ||
      !description ||
      !priceCode ||
      !areaCode ||
      !label ||
      !address ||
      !userId
    ) {
      return res.status(404).json({
        status: "ERR",
        msg: "Missing Input",
      });
    }

    const response = await PostService.createPost(
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
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId, attributesId, overviewId, imagesId, ...payload } = req.body;

    if (!postId || !attributesId || !overviewId || !imagesId) {
      return res.status(404).json({
        status: "ERR",
        msg: "Missing Input",
      });
    }

    const response = await PostService.updatePost(
      postId,
      attributesId,
      overviewId,
      imagesId,
      payload
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const {
      page,
      priceNumber = null,
      areaNumber = null,
      priceCode = null,
      areaCode = null,
      filter = null,
    } = req.query;
    const response = await PostService.getAllPost(page, {
      priceNumber,
      areaNumber,
      priceCode,
      areaCode,
      filter,
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
      categoryCode = null,
      priceNumber = null,
      areaNumber = null,
      priceCode = null,
      areaCode = null,
      cityCode = null,
      filter = null,
    } = req.query;
    console.log("123 ", req.query);

    const response = await PostService.getLimitPost(page, {
      categoryCode,
      priceNumber,
      areaNumber,
      priceCode,
      areaCode,
      cityCode,
      filter,
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
    const response = await PostService.getNewPost();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const getLimitAdmin = async (req, res) => {
  try {
    const {
      page,
      categoryCode = null,
      cityCode = null,
      filter = null,
    } = req.query;
    console.log("123 ", req.query);

    const response = await PostService.getLimitAdmin(page, {
      categoryCode,
      cityCode,
      filter,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(404).json({
        status: "ERR",
        msg: "Missing Input",
      });
    }

    const response = await PostService.deletePost(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};
module.exports = {
  createPost,
  getAllPost,
  getLimitPost,
  getNewPost,
  getLimitAdmin,
  updatePost,
  deletePost,
};
