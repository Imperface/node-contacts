const handleMongooseError = (error, data, next) => {
  console.log(error.name);
  const { name, code } = error;

  console.log(error.message);
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  const message =
    name === "MongoServerError" && code === 11000 ? "Conflict" : "Bad request";
  error.status = status;
  error.message = message;
  next();
};
module.exports = handleMongooseError;
