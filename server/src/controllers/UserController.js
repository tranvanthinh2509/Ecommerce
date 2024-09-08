const UserService = require("../services/UserService");

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
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

const detailUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("userid ", id);
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

module.exports = {
  registerUser,
  signInUser,
  detailUser,
  refreshToken,
};
