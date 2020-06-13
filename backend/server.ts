require('dotenv').config();
import Express from 'express'
import BodyParser from 'body-parser';
import socketio from 'socket.io'
import http from 'http'
import path from 'path';
// const tweets = require ('./routes/tweets')
import tweets from './routes/tweets'

const App = Express();
const PORT = 8080;
const server = http.createServer(App);
const io = socketio(server);

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
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
// mount routes
App.use("/api/markers", markersRouter(db));

//Tweet stream
tweets(App, io)


server.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});