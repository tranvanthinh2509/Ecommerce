const NavigateService = require("../services/NavigateService");

const navigate = async (req, res) => {
  try {
    const response = await NavigateService.navigate();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

module.exports = {
  navigate,
};
