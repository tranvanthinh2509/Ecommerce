const CityService = require("../services/CityService");

const getAllCity = async (req, res) => {
  try {
    const response = await CityService.getAllCity();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

module.exports = {
  getAllCity,
};
