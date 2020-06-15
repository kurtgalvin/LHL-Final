require('dotenv').config();
import Express from 'express'
import BodyParser from 'body-parser';
import socketio from 'socket.io'
import http from 'http'
import path from 'path';
import tweets from './routes/tweets'

const App = Express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(App);
const io = socketio(server);

// PG database client/connection setup
const { Pool } = require('pg');
import dbParams from './lib/db'
const db = new Pool(dbParams);
db.connect();

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
// App.use(Express.static('public'));

App.use(Express.static(path.join(__dirname, '../../frontend/build')));
App.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

// register routes
const markersRouter = require("./routes/markers");
const newsRouter = require("./routes/news")

// mount routes
App.use("/api/markers", markersRouter(db));
App.use("/api/news", newsRouter());

//Tweet stream
tweets(App, io)

server.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});