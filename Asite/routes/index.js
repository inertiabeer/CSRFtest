var express = require('express');
var router = express.Router();
var path=require('path');
const pg = require("pg");
const Pool = pg.Pool;
const {config} =require("../database"); 
var pool = new Pool(config);
/* GET home page. */
router.get('/', function(req, res, next) {
 
  if(req.session.user)
  {
    res.render('index', { username: req.session.user.username, money: req.session.user.money});
  }
  else
  {
    res.sendFile(path.resolve(__dirname,"../views/login.html"));
  }
});
router.get("/money",function(req,res,next){
  if (req.session.user)
  {
    if(req.session.user.money>=req.query.money)
    {
      req.session.user.money = req.query.money;
    }
   
    res.render('index', { username: req.session.user.username, money: req.session.user.money });
  }
  else {
    res.sendFile(path.resolve(__dirname, "../views/login.html"));
  }
})

module.exports = router;
