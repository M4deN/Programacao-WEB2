var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const cors = require('cors')

var app = express();
app.use(cors())

// view engine setup
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/tasks');

app.use('/', indexRouter);
app.use('/api/tasks', apiRouter);
app.post('/api/login', (req, res) => {
    const {usuario, senha} = req.body
    if (usuario != "" && senha == "teste") {
        //Permissao = Criar token
        const token = jwt.sign({user: usuario}, 'A1B2C3D4', {
            expiresIn: '1 min'});
        res.json({status: true, token: token, usuario: usuario})
    } else {
        //Sem permissao = sem token
        res.status(403).json({status:false})
    }
})

module.exports = app;
