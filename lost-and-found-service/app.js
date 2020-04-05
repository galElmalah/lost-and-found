const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/items');
const DB = require('./model/DB');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/items', usersRouter);

DB.connect({
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
}).then(() =>
  app.listen(config.server.port, () =>
    console.log(`Server listening on port ${config.server.port}!`),
  ),
);
