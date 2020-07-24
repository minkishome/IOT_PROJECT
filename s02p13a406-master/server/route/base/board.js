var express = require("express");
var app = express.Router();
const jwt = require('jsonwebtoken');
var sanitizeHtml = require('sanitize-html');
const {board} = require('../../models');
const bodyparser = require('body-parser');

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'br',
    'strong',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};
const noOption = {
  allowedTags: [
    'br'
  ],
  allowedAttributes: {   
  },
  allowedSchemes: ['data', 'http'],
};


app.get("/", async function(req, res) {
  var p = (req.query.page);
  var searchType = (req.query.searchType);
  var searchKeyword = (req.query.searchKeyword);
  if( p == "" || p == null || p == undefined || ( p != null && typeof p == "object" && !Object.keys(p).length ))
  {
    page = 1;
  }else{
    page = (parseInt(req.query.page, 10));
  }
  no = (page-1) * 10;
  no = Number(no);
  var selectParms = {
    no : no,
    searchType : searchType,
    keyword : searchKeyword,
  };
  
  var selectQuery = req.mybatisMapper.getStatement(
    "board",
    "allboard",
    selectParms,
    { language: "sql", indent : ""}
  );
  let data = "";
  try {
    data = await req.sequelize.query(selectQuery, {
      type: req.sequelize.QueryTypes.SELECT
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }

  if (data.length == 0) {
    res.set('last-page',1);
    res.json(data);
    return;
  }

  var sp = {
    searchType : searchType,
    keyword : searchKeyword,
  };
  
  var sq = req.mybatisMapper.getStatement(
    "board",
    "tempboard",
    sp,
    { language: "sql", indent : ""}
  );
  let tcnt = "";
  try {
    tcnt = await req.sequelize.query(sq, {
      type: req.sequelize.QueryTypes.SELECT
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }
  currentpage = parseInt(tcnt[0].tcnt/10)+1;
  res.set('last-page',currentpage);
  res.json(data);
});

app.get("/:bno", async function(req, res) {
  var selectParms = {
    bno : req.params.bno
  };
  let data;

  try {

    var rcnt = {
      bno : req.params.bno,
    };
    var rcntQuery = req.mybatisMapper.getStatement(
      "board",
      "initialrcnt",
      rcnt,
          { language: "sql", indent : "  "}
    );
      await req.sequelize.query(rcntQuery, {
        type: req.sequelize.QueryTypes.UPDATE
      });

  var selectQuery = req.mybatisMapper.getStatement(
    "board",
    "selectboard",
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
  res.json(data[0]);
});

app.post("/insert", async function(req, res) {
  
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const m_id = decoded.m_id;
      try{
  
  if(m_id===null || m_id === undefined || m_id === "undefined"){
    res.status = 401;
    return;
  }
}catch(error){
  res.status(401).send({ msg: "로그인 정보가 없습니다..", error: error });

  return;
}
String.prototype.replaceAll = function(org, dest) {
  return this.split(org).join(dest);
}
ct = sanitizeHtml(req.body.content,sanitizeOption);
nt = sanitizeHtml(req.body.content,noOption);
nt = nt.replaceAll("<br />","\n");
  var insertboardParms = {
    m_id : m_id,
    title : req.body.title,
    content : ct,
    text : nt,
  };
      try {
  if(insertboardParms.m_id===null || insertboardParms.title === null || insertboardParms.content ===null){
    return res.send("누락 에러 - 정보 값을 제대로 입력해주세요");
    }
  var insertboardQuery = req.mybatisMapper.getStatement(
    "board",
    "insertboard",
    insertboardParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(insertboardQuery, {
      type: req.sequelize.QueryTypes.INSERT,
    });

  const idxq = req.mybatisMapper.getStatement("board","idx",null,{lang:"sql", indent : ""});
  const idx =  await req.sequelize.query(idxq, {
    type: req.sequelize.QueryTypes.SELECT,
  });
  res.body = idx;
} catch (error) {
  res.status(403).send({ msg: "db insert에 실패하였습니다.", error: error });
  return;
}
res.json(res.body);
});
app.put("/vcnt/:bno", async function(req, res) {

  var viewcntParms = {
    bno : req.params.bno,
  };
      try {
  var viewcntQuery = req.mybatisMapper.getStatement(
    "board",
    "viewcntupdate",
    viewcntParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(viewcntQuery, {
      type: req.sequelize.QueryTypes.UPDATE
    });
  } catch (error) {
    res.status(403).send({ msg: "db update에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/rcnt/:bno", async function(req, res) {

  var replycntParms = {
    bno : req.params.bno,
  };
  try {
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
    res.status(403).send({ msg: "db update에 실패하였습니다.", error: error });
    return;
  }

  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/update/:bno", async function(req, res) {

  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const m_id = decoded.m_id; // 사용자 아이디

  let bno = req.params.bno;
  const bd = await board.findOne({where : {bno}});
  if(m_id !== bd.m_id){
    return res.status = 401;
  }

  String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}
  ct = sanitizeHtml(req.body.content,sanitizeOption);
  nt = sanitizeHtml(req.body.content,noOption);
  nt = nt.replaceAll("<br />","\n");
  var updateboardParms = {
    bno : req.params.bno,
    title : req.body.title,
    content : ct,
    text : nt,
  };

  try {
  var updateboardQuery = req.mybatisMapper.getStatement(
    "board",
    "updateboard",
    updateboardParms,
        { language: "sql", indent : "  "}
  );
    await req.sequelize.query(updateboardQuery, {
      type: req.sequelize.QueryTypes.UPDATE,
    });
  } catch (error) {
    res.status(403).send({ msg: "db select에 실패하였습니다.", error: error });
    return;
  }
  let temp = {"bno" : bno};
  res.body = temp;
  res.json(res.body);
});

app.delete("/del/:bno", async function(req, res) {

  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const m_id = decoded.m_id; // 사용자 아이디

  let bno = req.params.bno;
  const bd = await board.findOne({where : {bno}});
  if(m_id !== bd.m_id){
    return res.status = 401;
  }

  var deleteParms = {
    bno : req.params.bno,
    m_id : decoded.m_id
  };
  try {
  var deleteQuery = req.mybatisMapper.getStatement(
    "board",
    "deleteboard",
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
