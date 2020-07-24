var express = require("express");
var app = express.Router();

app.get("/", async function(req, res) {

  var selectQuery = req.mybatisMapper.getStatement(
    "MEMBER",
    "allmember",
    { language: "sql", indent : "  "}
  );
  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.json(data);
    return;
  }

  res.json(data);
});
app.get("/pw/:m_id", async function(req, res){
  var selectParms = {
    m_id : req.params.m_id
  };
  var selectQuery = req.mybatisMapper.getStatement(
    "MEMBER",
    "pwmember",
    selectParms,
    { language: "sql", indent : "  "}
  );
  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.json(data);
    return;
  }

  res.json(data);
});
app.get("/:m_id", async function(req, res) {
  var selectParms = {
    m_id : req.params.m_id
  };

  var selectQuery = req.mybatisMapper.getStatement(
    "MEMBER",
    "selectmember",
    selectParms,
    { language: "sql", indent : "  "}
  );
  let data = [];
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.json(data);
    return;
  }

  res.json(data);
});

app.post("/insert", async function(req, res) {
  
  var insertmemberParms = {
    m_id : req.body.m_id,
    email : req.body.email,
    pw : req.body.pw,
    name : req.body.name,
    location : req.body.location
  };
  
  try {
  var insertmemberQuery = req.mybatisMapper.getStatement(
    "MEMBER",
    "insertmember",
    insertmemberParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(insertmemberQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    res.status(403).send({ msg: "db insert에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});
app.put("/bcnt/:m_id", async function(req, res) {

  var bcntParms = {
    m_id : req.params.m_id,
  };
      try {
  var bcntQuery = req.mybatisMapper.getStatement(
    "MEMBER",
    "bcntupdate",
    bcntParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(bcntQuery, {
      type: req.sequelize.QueryTypes.UPDATE
    });
  } catch (error) {
    res.status(403).send({ msg: "업데이트 실패.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/update/:m_id", async function(req, res) {

  var updatememberParms = {
    m_id : req.params.m_id,
    email : req.body.email,
    pw : req.body.pw,
    name : req.body.name,
    location : req.body.location
  };
  try {

  var updatememberQuery = req.mybatisMapper.getStatement(
    "MEMBER",
    "updatemember",
    updatememberParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(updatememberQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
    });
  } catch (error) {
    res.status(403).send({ msg: "정보 수정에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/del/:m_id", async function(req, res) {

  var deleteParms = {
    m_id : req.params.m_id
  };
      try {
  var deleteQuery = req.mybatisMapper.getStatement(
    "member",
    "deletemember",
    deleteParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE
    });
  } catch (error) {
    res.status(403).send({ msg: "회원 삭제 실패.", error: error });
    return;
  }

  res.json({ success: "delete call succeed!", url: req.url });
});

module.exports = app;
