"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var App = express_1.default();
var PORT = 8080;
// Express Configuration
App.use(body_parser_1.default.urlencoded({ extended: false }));
App.use(body_parser_1.default.json());
App.use(express_1.default.static('public'));
// Sample GET route
App.get('/api/data', function (req, res) { return res.json({
    message: "Seems to work!",
}); });
App.listen(PORT, function () {
    console.log("Express seems to be listening on port " + PORT + " so that's pretty good \uD83D\uDC4D");
});
