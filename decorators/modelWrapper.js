const { HttpError } = require("../utils");

const modelWrapper = (model) => {
  const wrapper = async (req, res, next) => {
    try {
      return await model(req, res, next);
    } catch (error) {
      throw HttpError(500, "Internal Server Error");
    }
  };
  return wrapper;
};
module.exports = modelWrapper;
