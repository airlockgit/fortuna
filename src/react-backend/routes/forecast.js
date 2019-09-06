var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET forecast. */
const Forecast = async ({ id }) => {
    let data = await fs.readFileSync("./data/cast.json", "utf8");

    data = await JSON.parse(data);
    data = data.find(forecast => forecast.id == id);

    return data;
};

router.get('/', async (req, res, next) => {
    let { user_id } = req.query;
    let data = await fs.readFileSync("./data/cast.json", "utf8");

    data = await JSON.parse(data);
    data = data.find(forecast => forecast.id == user_id);
    res.status(200).send(data.forecast.list);
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