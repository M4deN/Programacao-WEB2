const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()

app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: '#asdfuihewu',
    resave: false,
    saveUninitialized: false
}))

function logarAutomatico(req, res, next) {
    req.session.logado = true;
    req.session.nome = "Automatico"
    req.session.contador = 0;
    return next()
}

app.get("/", (req, res) => {
    if (req.session.nome) {
        res.header('Content-Type', 'text/html');
        req.session.contador++;
        res.end("<h1>Ola " + req.session.nome + "</h1>" +
            "<p>" + req.session.contador +"</p>")

    } else {
        res.end(`
            <h1>Ola Anonimo!</h1>
            <form action='salvanome' method='post'>
               <label>Nome: <input type='text' name='nome'></label>
               <input type='submit' value='Salvar'>
            </form>` )
    }
})

controlaAcesso = function (req, res, next) {
    if (req.session.logado) {
        return next();
    }
    res.status(403).end("<h1>Acesso Negado!</h1>")
}

app.get("/intranet", controlaAcesso, (req, res) => {
    res.end("<h1>Area Restrita!</h1>")
})

app.get('/logout', (req, res) => {
    req.session.logado = false
    res.redirect("/")
})

app.post("/salvanome", (req, res) => {
    const {nome} = req.body
    if (nome) {
        req.session.logado = true
        req.session.nome = nome
        req.session.contador = 0;
    }
    res.redirect("/")
})

/*
//Usando cookies
app.get("/", (req, res) => {
    if (req.cookies.nome) {
        res.header('Content-Type', 'text/html');
        res.end("<h1>Ola " + req.cookies.nome + "</h1>")
    } else {
        res.end(`
            <h1>Ola Anonimo!</h1>
            <form action='salvanome' method='post'>
               <label>Nome: <input type='text' name='nome'></label>
               <input type='submit' value='Salvar'>
            </form>` )
    }
})

app.post("/salvanome", (req, res) => {
    const {nome} = req.body
    if (nome) {
        res.cookie("nome", nome, { expires: new Date(Date.now() + 9000)} )
    }
    res.redirect("/")
})
*/

app.listen(3000, () => {
    console.log("working..")
})