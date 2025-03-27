const moment = require("moment");
const bycrypt = require("bcrypt");

class Utils {
  static async hashPassword(password) {
    return await bycrypt.hash(password, 10);
  }

  static async formatDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }
  static async formatDateTime(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  }
  static async comparePassword(password, hash) {
    return await bycrypt.compare(password, hash);
  }
  static async currentDate() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
}
}
module.exports = Utils;