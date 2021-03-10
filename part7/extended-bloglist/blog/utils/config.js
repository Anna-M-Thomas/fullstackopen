require("dotenv").config();

let MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.MONGODB_URI_TEST;
}
const PORT = 3001;

module.exports = { MONGODB_URI, PORT };
