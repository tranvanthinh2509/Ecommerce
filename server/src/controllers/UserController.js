const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const textFlow = require("textflow.js");

textFlow.useKey(
  "2euNRu1yCCNDMUmVqtC3MV5uvio9LoxDL2xqLOwcQVljBkcNGcu7k1J5hA5ogAYg"
);

const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(200).json({
        status: "ERR",
        msg: "The input is required",
      });
    }

    const response = await UserService.registerUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(200).json({
        status: "ERR",
        msg: "The input is required",
      });
    }

    const response = await UserService.signInUser(req.body);

    const { refresh_token, ...newRespone } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samesite: "strict",
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      msg: "Log-out successfully",
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const detailUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        status: "ERR",
        msg: "UserId is required",
      });
    }

    const response = await UserService.detailUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }

    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const sendVerificationCode = async (req, res) => {
  try {
    await textFlow.sendSMS("+84707560285", "Dummy message text...");
    // const verificationOptions = {
    //   service_name: "Cho thue phong tro",
    //   seconds: 600,
    // };
    // const result = await textFlow.sendVerificationSMS(
    //   "+84707560285",
    //   verificationOptions
    // );

    return res.status(result.status).json("result.message");
  } catch (error) {
    return res.status(404).json("ERor");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { ...payload } = req.body;

    const response = await UserService.updateUser(id, payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

module.exports = {
  registerUser,
  signInUser,
  detailUser,
  refreshToken,
  logOutUser,
  sendVerificationCode,
  updateUser,
};
