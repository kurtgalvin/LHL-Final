"use strict";
var Express = require('express');
var App = Express();
var BodyParser = require('body-parser');
var PORT = 8080;
// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
// Sample GET route
App.get('/api/data', function (req, res) { return res.json({
    message: "Seems to work!",
}); });
App.listen(PORT, function () {
    console.log("Express seems to be listening on port " + PORT + " so that's pretty good \uD83D\uDC4D");
});
