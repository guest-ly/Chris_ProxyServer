const express = require('express');
const httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var reservationsServer = 'http://18.188.235.153',
    detailsServer = 'http://18.221.218.103',
    photosServer = 'http://3.14.5.145';
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3003;

app.use(morgan('tiny'));
app.use(bodyParser());
app.use('/:listingID', express.static(path.resolve(__dirname, './public/dist/')));

app.all("/api/listings/photos/:listingID", function(req, res) {
    apiProxy.web(req, res, {target: photosServer});
});

app.all("/listing/:listingID", function(req, res) {
    apiProxy.web(req, res, {target: reservationsServer});
});

app.all("/custom/month", function(req, res) {
    apiProxy.web(req, res, {target: reservationsServer});
});

app.all("/reserved/month", function(req, res) {
    apiProxy.web(req, res, {target: reservationsServer});
});

app.all("/listing/desc/:listingID", function(req, res) {
    apiProxy.web(req, res, {target: detailsServer});
});

app.all("/listing/amenity/:listingID", function(req, res) {
    apiProxy.web(req, res, {target: detailsServer});
});

app.listen(port, () => console.log(`Listening on port ${port}!`));