var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  let username = req.query.username; // логин
  let password = req.query.password; // пароль
  let data = fs.readFileSync("./data/users.json", "utf8");//данные в файле для демо
  let users = JSON.parse(data);
  let user = {
    user: null,
    success: false,
    auth: false,
    error: {
      username: false,
      password: false
    }
  };

      // находим в массиве пользователя по username
      for(let i=0; i<users.length; i++){
        if(users[i].username == username){
          // проверка пароля
          if(users[i].password == password){
            user.user = {
              id: users[i].id,
              token: users[i].token
            };
            user.success = true;
            user.auth = true;
          } else {
            user.message = 'Неверный пароль';//or bd, admin only
            user.error.password = true;
          }
            break;
        }
        if(user.user == null){
          user.message = 'Пользователь не найден!';
          user.error.username = true;
        }
    }

  res.send(user);
});

module.exports = router;
