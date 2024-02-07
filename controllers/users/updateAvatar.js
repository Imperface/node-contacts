const jimp = require("jimp");
const path = require("node:path");
const fs = require("fs/promises");

const { HttpError } = require("../../utils");
const { User } = require("../../models/user");

// get folder path for saving images
const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;

  // throw error if image not received
  if (!req.file) {
    throw HttpError(400, "Image is required");
  }

  // get params for move file
  const { path: tempUpload, originalname } = req.file;

  // read the image
  const image = await jimp.read(tempUpload);

  // resize the image to width 250 and height 250
  await image.resize(250, 250);

  // save and overwrite the image
  await image.writeAsync(tempUpload);

  // naming file
  const filename = `${_id}_${originalname}`;

  // get path for move file in folder
  const resultUpload = path.join(avatarsDir, filename);

  // move file
  await fs.rename(tempUpload, resultUpload);

  // get part of url for updated user avatar
  const avatarURL = path.join("avatars", filename);

  // update user document
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    { new: true }
  );

  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
