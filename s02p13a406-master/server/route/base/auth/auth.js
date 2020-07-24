const Joi = require('joi');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {members} = require('../../../models');

const router = express.Router();
router.post('/join', async(req,res,next)=>{
    const token = req.cookies.access_token;
  if(token!=="undefined" && token){
    return res.status(403).send('로그아웃 필요');
  }
    const schema = Joi.object().keys({
      m_id : Joi.string()
      .alphanum()
      .min(0) 
      .max(20)
      .required(),
      pw : Joi.string().required(),
      email : Joi.string(),
      name : Joi.string(),
      location : Joi.string(),
    });
    const result = Joi.validate(req.body, schema);
    if(result.error){
      res.status = 400;
      res.body = result.error;
      return;
    }

    const {m_id, pw, email,name,location} = req.body;
    try{
      const exMember = await members.findOne({where : {m_id}});
      if(exMember){
        res.status = 409;
        return res.redirect('/');           
        }
       const member =  await members.create({
            m_id,
            email,
            pw ,
            name,
            location,
        });
        const user = new members({
          m_id, pw,
        });
        const sr = async function(){
          return user.toJSON();
        }
        res.body = await sr();
        const generateToken = async function(){
          const token = jwt.sign({
            m_id : member.m_id,
            password : member.pw,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 7200000
          },
          );
          return token;
        };
        const token = await generateToken();
        res.cookie('access_token',token,{
          maxAge : 1000 * 60 * 60 * 2, // 2 시간
          httpOnly : true,
        });
        return res.send("회원가입 성공");
    }catch(error){
        console.error(error);
    }

});
router.post('/login', async(req, res, next) => {
  const token = req.cookies.access_token;
  if(token!=="undefined" && token){
    return res.status(403).send('로그아웃 필요');
  }

  const {m_id, pw} = req.body;
  if(!m_id || !pw){
    res.status = 401;
    return res.send("아이디, 비밀번호 누락 오류");
  }
  try{
    const user = await members.findOne({where : {m_id}});

    if(!user){
      res.status = 401;
      return res.send("존재하는 회원이 없습니다.");
    }
    const vresult = async function(pw){
      if(pw === user.pw){
        return true;
      }else{
        return false;
      }
    }
    const valid = await vresult(pw);
    if(!valid){
      res.status = 401;
      return res.send("pw가 다릅니다. - 로그인 화면 이동");      
    }
    const sr = async function(){
      return user.toJSON();
    }
    res.body = await sr();

    const generateToken = function(){
      const token = jwt.sign({
        m_id : user.m_id,
        password : user.pw,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 7200000
      },
      );
      return token;
    };
    const token =  generateToken();
    res.cookie('access_token',token,{
      maxAge : 1000 * 60 * 60 * 2,
      httpOnly : true,
    });
    return res.send(res.body);
  } catch(e){
    console.log(e);
  }
 });
  
router.post('/check', async (req,res,next) =>{

  const verifyToken = (t) => {
    return new Promise((resolve, reject) => {
      jwt.verify(t, process.env.JWT_SECRET, (err, v) => {
        if(!t || t===undefined || t==="undefined"){
          reject();
        }
        if (err) reject(err);
        resolve(v);
      })
    })
  }

  var token = req.cookies.access_token;

  async function doit(token){
    try{
     
      decoded = await verifyToken(token);
       return decoded;
    } catch (error) {
        return;
    }
  }
  var decoded =  await doit(token);
  if(!decoded || decoded===undefined || decoded==="undefined"){
    return;
  }else{
  dm_id = decoded.m_id;
  const now = Math.floor(Date.now() / 1000);
   if(decoded.exp - now < 60 * 60 *1){
    const member = await members.findOne({where : {dm_id}});
     const generateToken = function(){
      const mtoken = jwt.sign({
        m_id : member.m_id,
        pw : member.pw,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 7200000
      },
      );
      
      return mtoken;
    };
    res.cookie('access_token',token,{
      maxAge : 1000 * 60 * 60 * 2,
      httpOnly : true,
    });
   }  
   const sr = async function(){
    user = {
        "m_id": decoded.m_id,
  };
    return user;
  }
  res.body = await sr();
   return res.send(res.body);
  }
});


  router.post('/logout', async(req, res) => {
    const token = req.cookies.access_token;
    res.cookie('access_token');
    res.status = 204;
    req.session.destroy();
    return res.redirect('/');
  });
  
  
  module.exports = router;