var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function (req, res, next) {
    let username = req.query.username; // логин
    let password = req.query.password; // пароль
    let data = fs.readFileSync("./data/cast.json", "utf8");
    let cast = JSON.parse(data);

    res.send(cast);
});

module.exports = router;