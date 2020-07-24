var express = require("express");
var app = express.Router();

app.get("/", async function(req, res) {

  var selectQuery = req.mybatisMapper.getStatement(
    "faq",
    "allfaq",
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

app.get("/:q_id", async function(req, res) {
  var selectParms = {
    q_id : req.params.q_id
  };
  let data = [];
  try {
  var selectQuery = req.mybatisMapper.getStatement(
    "faq",
    "selectfaq",
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
  
  var insertfaqParms = {
    title : req.body.title,
    content : req.body.content,
  };
  
  try {
  var insertfaqQuery = req.mybatisMapper.getStatement(
    "faq",
    "insertfaq",
    insertfaqParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(insertfaqQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    res.status(403).send({ msg: "db insert에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/update/:q_id", async function(req, res) {

  var updatefaqParms = {
    q_id : req.params.q_id,
    title : req.body.title,
    content : req.body.content
  };

  try {
  var updatefaqQuery = req.mybatisMapper.getStatement(
    "faq",
    "updatefaq",
    updatefaqParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(updatefaqQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
    });
  } catch (error) {
    res.status(403).send({ msg: "db update에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/del/:q_id", async function(req, res) {

  var deleteParms = {
    q_id : req.params.q_id
  };
      try {
  var deleteQuery = req.mybatisMapper.getStatement(
    "faq",
    "deletefaq",
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
