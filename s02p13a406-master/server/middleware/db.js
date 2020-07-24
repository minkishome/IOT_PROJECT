const path = require("path");
const Sequelize = require("sequelize");
const mybatisMapper = require("mybatis-mapper");
const envJson = require(`${__dirname}/../env/env.json`);
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password,config);
const sqlPath = path.join(__dirname, "..", ".", `/sql/${envJson.version}/`);


mybatisMapper.createMapper([`${sqlPath}/board.xml`]);
mybatisMapper.createMapper([`${sqlPath}/member.xml`]);
mybatisMapper.createMapper([`${sqlPath}/barn.xml`]);
mybatisMapper.createMapper([`${sqlPath}/livestock.xml`]);
mybatisMapper.createMapper([`${sqlPath}/ls_bs.xml`]);
mybatisMapper.createMapper([`${sqlPath}/faq.xml`]);
mybatisMapper.createMapper([`${sqlPath}/planner.xml`]);
mybatisMapper.createMapper([`${sqlPath}/reply.xml`]);

var init = async function(req, res, next) {
  req.sequelize = sequelize;
  req.mybatisMapper = mybatisMapper;

  next();
};

module.exports = init;
