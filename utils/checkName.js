const checkDuplicateName = (name, data) =>
  data.find(
    (item) => item.name.toLowerCase().trim() === name.toLowerCase().trim()
  );
module.exports = checkDuplicateName;
