const ipfs = require('./ipfs');
const express = require('express'),
    bodyParser = require('body-parser');
const web3 = require('web3');
const mine = require('./mine');
const db = require('./auth/db');

const jwt = require('jsonwebtoken');

const expressJwt = require('express-jwt');
const authenticate = expressJwt({ secret: 'MY_SECRET' });


var passport = require('./auth/auth');
var authjwt = require('./auth/authjwt');

ipfs.connect();
mine.connectweb3();
mine.createInstance();

var arr = [];
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/login', passport.authenticate(
        'local', { session: false }),
    authjwt.serialize,
    authjwt.generateToken,
    authjwt.respond);

app.post('/register', (req, res) => {

    var user = new db();

    user.name = req.body.name;
    user.phone = req.body.phone;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save((err, usr) => {
        if (err) console.log("error " + err);

        console.log(usr);

        req.token = jwt.sign({
            id: usr.email,
        }, 'MY_SECRET', {
            expiresIn: "1h"
        });

        res.send(req.token);
    })

});

app.post('/add', authenticate, function(req, res) {

    var productdata = req.body;

    var seller = productdata.seller;

    ipfs.saveFile(productdata, (e, currentProduct) => {
        if (e) return res.send(e);

        OldData = mine.getData("getproduct", []);

        ipfs.getFile(OldData, (e, oldDataObj) => {
            oldDataObj = JSON.parse(oldDataObj);
            oldDataObj.push({
                seller: productdata.seller,
                product: currentProduct
            });

            ipfs.saveFile(oldDataObj, (e, newDataHash) => {
                mine.setData("setproduct", [newDataHash], (e, transaction) => {
                    console.log("trasnsaction " + transaction);
                    res.send(" transaction mined ");
                });
            })
        });
    });
});

app.get('/get', authenticate, function(req, res) {

    hash = mine.getData("getproduct", []);
    console.log("get hora  " + hash);
    ipfs.getFile(hash, (e, obj) => {
        res.send(JSON.parse(obj));
    });
});

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

app.listen(3000, function() {
    console.log("the server is up on 3000");
});