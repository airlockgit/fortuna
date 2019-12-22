var express = require('express');
var router = express.Router();
var fs = require("fs");
var request = require('request');

/* GET forecast. */
const Forecast = async ({ id, token = false }) => {
    let data = await fs.readFileSync("./data/cast.json", "utf8");

    data = await JSON.parse(data);
    if (token) {
        data = data.find(forecast => forecast.token == token);
    } else {
        data = data.find(forecast => forecast.id == id);
    }

    return data;
};

router.get('/', async (req, res, next) => {
    let data = await Forecast(req.query);

    res.status(200).send(data.forecast.list);
});

router.get('/donations/token', async (req, res, next) => {//www.donationalerts.com
    ///получаем token, потом меняем его на socket_connection_token для centrifugo
    request.post({
        url: 'https://www.donationalerts.com/oauth/token',
        form: {
            grant_type: 'authorization_code',
            client_id: 230,
            client_secret: '7q9vLP4rx43CxLCRQrBAIn82DZjs1z0zQd0pPiYA',
            redirect_uri: 'http://localhost:3000/profile',
            code: req.query.code,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, async (err, response, body) => {
        const data = await JSON.parse(body);
        const token = await data.access_token;
        console.log('access_token', token);
        request.get({
            url: 'https://www.donationalerts.com/api/v1/user/oauth',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        }, (err, response, body) => {
            body.data.token = token;
            res.status(200).send(body);
        });
    });
});

router.get('/start/:token', async (req, res, next) => {
    //console.log(req)
    let data = await Forecast(req.params);

    res.status(200).send(data.forecast);
});

router.get('/users/:id', async (req, res, next) => {
    let data = await Forecast(req.params);
    let { forecast } = data;
    let forecastId = forecast.id;
    let newId = +forecastId + 1;

    res.locals.newId = newId;
    res.locals.user = data;
    res.status(200).send({ id: newId });
    next();
}, (req, res) => {
    fs.readFile("./data/cast.json", "utf8",
        async (error, data) => {
            let { id } = req.params;
            let { user, newId } = res.locals;

            data = await JSON.parse(data);
            data = data.filter(user => user.id != id);

            user.forecast.id = newId;

            data = [...data, user];
            fs.writeFileSync("./data/cast.json", JSON.stringify(data), "utf8");
        }
    );
});

router.put('/update', async (req, res, next) => {
    let { id, list } = req.body.data;
    let data = await fs.readFileSync("./data/cast.json", "utf8");

    data = await JSON.parse(data);

    let user = data.find(forecast => forecast.id == id);

    data = data.filter(user => user.id != id);
    user.forecast.list = list;
    data = [...data, user];
    fs.writeFileSync("./data/cast.json", JSON.stringify(data), "utf8");
    res.status(200).send({ success: true });
});

module.exports = router;