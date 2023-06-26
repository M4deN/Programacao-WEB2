//Requires gerais
const path = require("path")
require("dotenv").config()

//Express
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

//Template
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress()
app.engine("mustache", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

//Cookies
const cookieParser = require("cookie-parser")
app.use(cookieParser())

//Sessão
const session = require("express-session")
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//Passaport
const passport = require('passport')
const configPassport = require('./helpers/auth')
configPassport(passport)
app.use(passport.initialize())
app.use(passport.session())

//Rotas
const mainRouter = require('./controls/main')
const loginControl = require('./controls/login')

app.use("/", mainRouter)

//Login pelo formulário da interface
app.post("/login", loginControl, passport.authenticate("local", {
    successRedirect: "intranet",
    failureRedirect: "/",
    failureMessage: true
}))

app.listen(process.env.PORT, () => {
    console.log("Running...")
})