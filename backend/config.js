const dotenv = require('dotenv');

dotenv.config();

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)/;
const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET = 'secret',
} = process.env;

module.exports = {
  URL_REGEX, PORT, DB_URL, JWT_SECRET,
};
