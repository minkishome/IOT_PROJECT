var express = require("express");
var app = express.Router();

app.get("/", async function(req, res) {

  var selectQuery = req.mybatisMapper.getStatement(
    "BARN",
    "allbarn",
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

app.get("/:b_id", async function(req, res) {

  var today;
  var year;
  var month;
  var day;

  var b_date = req.query.b_date;
  if(b_date===null || b_date==="" || !b_date){
     today = new Date();
     day = today.getDate();
     month = today.getMonth()+1; 
     year = today.getFullYear();
  }
else{
 var arr = b_date.split('-');
  year = arr[0];
  month = arr[1];
  day = arr[2];
} 
let data = [];
let k = [];
try {
  var selcount = {
    b_id : req.params.b_id,
  }
  var selectParms = {
    b_id : req.params.b_id,
    year : year,
    month : month,
    day : day
  };
  var selcnt = req.mybatisMapper.getStatement(
    "BARN",
    "selcount",
    selcount,
    { language: "sql", indent : "  "}
  );
  k = await req.sequelize.query(selcnt, {
    type: req.sequelize.QueryTypes.SELECT
  });
  var selectQuery = req.mybatisMapper.getStatement(
    "BARN",
    "selectbarn",
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
    res.set('barn-cnt',k[0].count);
    res.json(data);
    return;
  }
  res.set('barn-cnt',k[0].count);
  res.json(data);
});

app.get("/member/:m_id", async function(req, res) {

  var selectParms = {
    m_id : req.params.m_id
  };
  let data = [];
  try {
  var selectQuery = req.mybatisMapper.getStatement(
    "BARN",
    "selectmember",
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
  
  var insertbarnParms = {
    b_id : req.body.b_id,
    m_id : req.body.m_id
  };
  
  try {
  var insertbarnQuery = req.mybatisMapper.getStatement(
    "BARN",
    "insertbarn",
    insertbarnParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(insertbarnQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    res.status(403).send({ msg: "정보 추가 실패.", error: error });
    return;
  }

  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});
app.put("/cnt/:b_id", async function(req, res) {

  var cntParms = {
    b_id : req.params.b_id,
  };
      try {
  var cntQuery = req.mybatisMapper.getStatement(
    "BARN",
    "updatecount",
    cntParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(cntQuery, {
      type: req.sequelize.QueryTypes.UPDATE
    });
  } catch (error) {
    res.status(403).send({ msg: "정보 수정에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/update/:b_id", async function(req, res) {

  var updatebarnParms = {
    b_id : req.params.b_id,
    temperature : req.body.temperature,
    humidity : req.body.humidity,
    ch4 : req.body.ch4,
    co2 : req.body.co2
  };
  
  try {
  var updatebarnQuery = req.mybatisMapper.getStatement(
    "BARN",
    "updatebarn",
    updatebarnParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(updatebarnQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
    });
  } catch (error) {
    res.status(403).send({ msg: "정보 수정에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});
app.delete("/del/:b_id", async function(req, res) {

  var deleteParms = {
    b_id : req.params.b_id
  };
  try {
  var UpdateQuery = req.mybatisMapper.getStatement(
    "member",
    "bcntminus",
    deleteParms,
    { language: "sql", indent : "  "}
  );
  await req.sequelize.query(UpdateQuery, {
   type: req.sequelize.QueryTypes.UPDATE
  });



  var deleteQuery = req.mybatisMapper.getStatement(
    "BARN",
    "deletebarn",
    deleteParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE
    });
  } catch (error) {
    res.status(403).send({ msg: "삭제에 실패하였습니다.", error: error });
    return;
  }


  res.json({ success: "delete call succeed!", url: req.url });
});

module.exports = app;
