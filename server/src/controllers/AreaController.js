const AreaService = require("../services/AreaService");

const getAllArea = async (req, res) => {
  try {
    const response = await AreaService.getAllArea();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

module.exports = {
  getAllArea,
};
