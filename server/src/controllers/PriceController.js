const PriceService = require("../services/PriceService");

const getAllPrice = async (req, res) => {
  try {
    const response = await PriceService.getAllPrice();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      msg: "Error in controller : " + error,
    });
  }
};

module.exports = {
  getAllPrice,
};
