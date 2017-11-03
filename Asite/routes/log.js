var express = require('express');
var router = express.Router();
const pg = require("pg");
const Pool = pg.Pool;
const { config } = require("../database"); 
var pool = new Pool(config);
router.post('/login', function (req, res) {
    console.log(req.body);
    var sql = "SELECT userpassword FROM public.user WHERE username='" + req.body.username + "'";
    console.log(sql);
    pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result.rows[0] === undefined) {
            res.send('不存在此用户名')
        }
        else if (result.rows[0].userpassword == req.body.password) {
            var user = {
                username: req.body.username,
                password: req.body.password,
                money:10000
            }
            req.session.user = user;
            res.send('y');



        } else {
            res.send('用户名与密码不匹配');
        }


    })

});

router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
    })


    res.send('y');
})
router.post('/logup', function (req, res) {
    console.log(req.body);
    var sql = "INSERT INTO public.user (username,userpassword) VALUES ('" + req.body.username + "', '" + req.body.password + "')";
    console.log(sql);
    var user_table = "CREATE TABLE user_" + req.body.username + "(action VARCHAR, time VARCHAR)";
    console.log(user_table);
    pool.query(user_table, function (err, result) {
        if (err) {
            console.log(err);
        }


    });


    pool.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.send('error');
        } else {

            console.log(result);
            res.send("y");
        }
    })
});
module.exports = router;