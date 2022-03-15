const moment = require("moment");

const validDate = (value) => {
  if (value) {
    const fecha = moment(value);

    if (fecha.isValid()) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = { validDate };
