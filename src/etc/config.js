const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  DEV_PORT: process.env.DEV_PORT || 8080
};
