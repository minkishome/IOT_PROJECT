const envJson = require(`${__dirname}/../env/env.json`);
const env = process.env.ENV ? process.env.ENV : envJson.env;

var init = async function(req, res, next) {
  req.env = env;
  next();
};

module.exports = init;
