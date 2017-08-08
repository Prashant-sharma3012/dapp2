const ipfs = require('./ipfs');
const express = require('express'),
    bodyParser = require('body-parser');
const web3 = require('web3');
const mine = require('./mine');
const db = require('./auth/db');
var passport = require('passport');

require('./auth/pass');
var authApi = require('./auth/authroute');

ipfs.connect();
mine.connectweb3();
mine.createInstance();

var arr = [];
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(passport.initialize());

app.use('/auth', authApi);

app.post('/add', function(req, res) {
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

app.get('/get', function(req, res) {
    hash = mine.getData("getproduct", []);
    console.log("get hora  " + hash);
    ipfs.getFile(hash, (e, obj) => {
        res.send(JSON.parse(obj));
    });
});

app.listen(3000, function() {
    console.log("the server is up on 3000");
});