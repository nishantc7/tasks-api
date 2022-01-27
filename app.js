var express = require('express');
const {sequelize} = require('./models');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companiesRoute = require('./routes/companies');

async function main(){
    await sequelize.authenticate();
    // sequelize.sync({alter:true, drop: true});
    // sequelize.sync({force:true});
}
main();
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/companies', companiesRoute);


module.exports = app;
