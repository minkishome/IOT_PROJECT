var express = require("express");
var app = express.Router();
const jwt = require('jsonwebtoken');

app.get("/", async function(req, res) {
  var bno = req.query.bno;
  var selectParms = {
    bno : bno,
  };
  var selectQuery = req.mybatisMapper.getStatement(
    "reply",
    "selectbno",
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
  res.set('bno',bno);
  res.json(data);
});

app.get("/:rno", async function(req, res) {
  var selectParms = {
    rno : req.params.rno
  };
  let data = [];
  try {

  var selectQuery = req.mybatisMapper.getStatement(
    "reply",
    "selectreply",
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
    res.json(data);    return;
  }

  res.json(data);
});
app.get("/member/:m_id", async function(req, res) {
    var selectParms = {
      m_id : req.params.m_id
    };
    let data = [];
    try {
    var selectQuery = req.mybatisMapper.getStatement(
      "reply",
      "selectreplym",
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
      res.json(data);      return;
    }
  
    res.json(data);
});
  
app.get("/board/:bno", async function(req, res) {
    var selectParms = {
        bno : req.params.bno
    };
    let data = [];
    try {
    var selectQuery = req.mybatisMapper.getStatement(
      "reply",
      "selectbno",
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
      res.json(data);      return;
    }
  
    res.json(data);
});

app.post("/insert", async function(req, res) {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  var insertreplyParms = {
    bno : req.body.bno,
    replytext : req.body.replytext,
    m_id : decoded.m_id,
  };

  var insertreplyQuery = req.mybatisMapper.getStatement(
    "reply",
    "insertreply",
    insertreplyParms,
        { language: "sql", indent : "  "}
  );
  
  try {
    await req.sequelize.query(insertreplyQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });

    var replycntParms = {
      bno : req.body.bno,
    };

    var replycntQuery = req.mybatisMapper.getStatement(
      "board",
      "replycnt",
      replycntParms,
          { language: "sql", indent : "  "}
    );
      await req.sequelize.query(replycntQuery, {
        type: req.sequelize.QueryTypes.UPDATE
      });

  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/update/:rno", async function(req, res) {

  var updatereplyParms = {
    rno : req.params.rno,
    replytext : req.body.replytext,
  };
  
  try {
  var updatereplyQuery = req.mybatisMapper.getStatement(
    "reply",
    "updatereply",
    updatereplyParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(updatereplyQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
    });
  } catch (error) {
    res.status(403).send({ msg: "db update에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/del/:rno", async function(req, res) {
  var deleteParms = {
    rno : req.params.rno
  };
  var updateParms = {
    rno : req.params.rno
  };
  try {
  var UpdateQuery = req.mybatisMapper.getStatement(
      "reply",
      "minuscount",
      updateParms,
      { language: "sql", indent : "  "}
  );
  await req.sequelize.query(UpdateQuery, {
    type: req.sequelize.QueryTypes.UPDATE
  });

  var deleteQuery = req.mybatisMapper.getStatement(
    "reply",
    "deletereply",
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
