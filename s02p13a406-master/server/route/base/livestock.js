var express = require("express");
var app = express.Router();

app.get("/", async function(req, res) {
  
  var selectQuery = req.mybatisMapper.getStatement(
    "livestock",
    "alllivestock",
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

app.get("/:ls_id", async function(req, res) {
  var today;
  var year;
  var month;
  var day;

  var ls_date = req.query.ls_date;
  if(ls_date===null || ls_date==="" || !ls_date){
     today = new Date();
     day = today.getDate();
     month = today.getMonth()+1; 
     year = today.getFullYear();
  }
else{
 var arr = ls_date.split('-');
  year = arr[0];
  month = arr[1];
  day = arr[2];
} 
let data = [];
let k = [];
try {
var selkindes = {
  ls_id : req.params.ls_id,
}
  var selectParms = {
    ls_id : req.params.ls_id,
    year : year,
    month : month,
    day : day
  };
  var selectkinds = req.mybatisMapper.getStatement(
    "livestock",
    "selkinds",
    selkindes,
    { language: "sql", indent : "  "}
  );
  k = await req.sequelize.query(selectkinds, {
    type: req.sequelize.QueryTypes.SELECT
  });
  var selectQuery = req.mybatisMapper.getStatement(
    "livestock",
    "selectlivestock",
    selectParms,
    { language: "sql", indent : "  "}
  );

    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.set('livestock-kinds',k[0].kinds);
    res.json(data);
    return;
  }
  res.set('livestock-kinds',k[0].kinds);
  res.json(data);
});

app.get("/member/:m_id", async function(req, res) {
  var selectParms = {
    m_id : req.params.m_id,
  };
  let data = [];
  try {
  var selectQuery = req.mybatisMapper.getStatement(
    "livestock",
    "selectlivestock2",
    selectParms,
    { language: "sql", indent : "  "}
  );
 
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

app.get("/barn/:b_id", async function(req, res) {
  var selectParms = {
    b_id : req.params.b_id
  };
  let data = [];
  try {
  var selectQuery = req.mybatisMapper.getStatement(
    "livestock",
    "selectlivestock3",
    selectParms,
    { language: "sql", indent : "  "}
  );
  
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
  
  var insertlivestockParms = {
    ls_id : req.body.ls_id,
    m_id : req.body.m_id,
    b_id : req.body.b_id,
    kinds : req.body.kinds
  };
  
  try {
  var insertlivestockQuery = req.mybatisMapper.getStatement(
    "livestock",
    "insertlivestock",
    insertlivestockParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(insertlivestockQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});


app.put("/update/:ls_id", async function(req, res) {

  var updatelivestockParms = {
    ls_id : req.params.ls_id,
    body_temperature : req.body.body_temperature,
    heart_rate : req.body.heart_rate,
    step_count : req.body.step_count,
  };
  
  try {
  var updatelivestockQuery = req.mybatisMapper.getStatement(
    "livestock",
    "updatelivestock",
    updatelivestockParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(updatelivestockQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
    });
  } catch (error) {
    res.status(403).send({ msg: "db update에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/del/:ls_id", async function(req, res) {

  var deleteParms = {
    ls_id : req.params.ls_id
  };
      try {
  var deleteQuery = req.mybatisMapper.getStatement(
    "livestock",
    "deletelivestock",
    deleteParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE
    });
  } catch (error) {
    res.status(403).send({ msg: "db delete에 실패하였습니다.", error: error });
    return;
  }

 
  res.json({ success: "delete call succeed!", url: req.url });
});

module.exports = app;
