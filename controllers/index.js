const { controllerWrapper } = require("../decorators");

// contacts controllers
const listContacts = require("./contacts/listContacts");
const getContactById = require("./contacts/getContactById");
const addContact = require("./contacts/addContact");
const removeContact = require("./contacts/removeContact");
const updateContact = require("./contacts/updateContact");
const updateContactStatus = require("./contacts/updateContactStatus");

// users controllers
const register = require("./users/register");
const login = require("./users/login");
const logout = require("./users/logout");
const current = require("./users/current");
const subscriptionUpdate = require("./users/subscriptionUpdate");
const updateAvatar = require("./users/updateAvatar");
const verify = require("./users/verify");
const resendVerifyEmail = require("./users/resendVerifyEmail");

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
  updateContactStatus: controllerWrapper(updateContactStatus),

  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
  subscriptionUpdate: controllerWrapper(subscriptionUpdate),
  updateAvatar: controllerWrapper(updateAvatar),
  verify: controllerWrapper(verify),
  resendVerifyEmail: controllerWrapper(resendVerifyEmail),
};
