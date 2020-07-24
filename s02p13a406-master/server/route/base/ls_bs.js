var express = require("express");
var app = express.Router();

app.get("/", async function(req, res) {

  var selectQuery = req.mybatisMapper.getStatement(
    "LS_BS",
    "all",
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
    res.status(403).send({ msg: "정보가 없습니다." });
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
      "LS_BS",
      "selectb",
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
      res.status(403).send({ msg: "정보가 없습니다." });
      return;
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
      "LS_BS",
      "selectm",
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
      res.status(403).send({ msg: "정보가 없습니다." });
      return;
    }
  
    res.json(data);
  });
app.get("livestock/:ls_id", async function(req, res) {
    var selectParms = {
      ls_id : req.params.ls_id
    };
    let data = [];
    try {
    var selectQuery = req.mybatisMapper.getStatement(
      "LS_BS",
      "selectls_bs",
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
      res.status(403).send({ msg: "정보가 없습니다." });
      return;
    }
  
    res.json(data);
  });

app.post("/insert", async function(req, res) {
  
  var insertParms = {
    ls_id : req.body.ls_id,
    b_id : req.body.b_id,
    m_id : req.body.m_id,
    location : req.body.location,
    gender : req.body.gender,
    pregnancy : req.body.pregnancy
  };

  try {
  var insertQuery = req.mybatisMapper.getStatement(
    "LS_BS",
    "insertls_bs",
    insertParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(insertQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});


app.put("/update/:ls_id", async function(req, res) {

  var updateParms = {
    ls_id : req.params.ls_id,
    location : req.body.location,
    gender : req.body.gender,
    pregnancy : req.body.pregnancy
  };
  
  try {
  var updateQuery = req.mybatisMapper.getStatement(
    "LS_BS",
    "updatels_bs",
    updateParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(updateQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
    });
  } catch (error) {
    res.status(403).send({ msg: "db update에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.delete("/del/:b_id", async function(req, res) {

  var deleteParms = {
    b_id : req.params.b_id
  };
  var deleteQuery = req.mybatisMapper.getStatement(
    "LS_BS",
    "deletebarn_livestock",
    deleteParms,
        { language: "sql", indent : "  "}
  );
  try {
    await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE
    });
  } catch (error) {
    res.status(403).send({ msg: "db delete에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.json(data);
    return;
  }

  res.json(data);

  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/del/:m_id", async function(req, res) {

  var deleteParms = {
    m_id : req.params.m_id
  };
  var deleteQuery = req.mybatisMapper.getStatement(
    "LS_BS",
    "delete_member_livestorck",
    deleteParms,
        { language: "sql", indent : "  "}
  );
  try {
    await req.sequelize.query(deleteQuery, {
      type: req.sequelize.QueryTypes.DELETE
    });
  } catch (error) {
    res.status(403).send({ msg: "db delete에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.json(data);
    return;
  }
  res.json(data);

  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/del/:ls_id", async function(req, res) {

    var deleteParms = {
        ls_id : req.params.ls_id,
      };
          try {
    var deleteQuery = req.mybatisMapper.getStatement(
      "LS_BS",
      "deletels_bs",
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
