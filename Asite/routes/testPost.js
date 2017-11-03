var express = require('express');
var router = express.Router();
var path = require('path');
const pg = require("pg");
const Pool = pg.Pool;
const { config } = require("../database"); 
var pool = new Pool(config);
/* GET home page. */
router.get('/', function (req, res, next) {

    if (req.session.user) {
        res.render('testPost', { username: req.session.user.username, money: req.session.user.money });
    }
    else {
        res.sendFile(path.resolve(__dirname, "../views/login.html"));
    }
});
router.post("/money", function (req, res, next) {
    if (req.session.user) {
        console.log(req.body.money)
        req.session.user.money = req.session.user.money-req.body.money;
        

        res.send(JSON.stringify(req.session.user.money));
    }
    else {
        res.sendFile(path.resolve(__dirname, "../views/login.html"));
    }
})

module.exports = router;
