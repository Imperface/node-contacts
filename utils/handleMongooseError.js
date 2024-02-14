const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  let status = 400;
  let message = "Bad request";

  if (name === "MongoServerError" && code === 11000) {
    message = "Conflict";
    status = 409;
  }

  error.status = status;
  error.message = message;
  next();
};
module.exports = handleMongooseError;
