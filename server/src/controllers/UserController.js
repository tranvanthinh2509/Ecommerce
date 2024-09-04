const UserService = require("../services/UserService");

const registerUser = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(200).json({
        status: 1,
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
        status: 1,
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

module.exports = {
  registerUser,
  signInUser,
};
