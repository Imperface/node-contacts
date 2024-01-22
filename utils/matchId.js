const HttpError = require("./HttpError");

const matchId = (contactId) => {
  // check is id match objectId
  if (!contactId.match(/^[0-9a-fA-F]{24}$/)) {
    throw HttpError(400, "invalid form id (must be 24 characters long)");
  }
};
module.exports = matchId;
