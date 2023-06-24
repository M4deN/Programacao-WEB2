const path = require("path")
const express = require("express")
const mustacheExpress = require("mustache-express")
const bodyParser = require("body-parser")
const app = express()

app.engine("mustache", mustacheExpress())
app.set("views", path.join(__dirname, "templates"))
app.set("view engine", "mustache")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

function inverteTexto(texto) {
    let res = ""
    for (i = texto.length - 1; i>=0; i--) {
        res += texto[i];
    }
    return res;
}

const Joi = require('joi')
app.get("/page1", (req, res) => {
    args = {}
    const {error, value} = Joi.string().alphanum().validate(req.query.texto)
    if (value) {
        args['texto'] = value;
        args['textoinvertido'] = inverteTexto(value);
    }
    res.render("atividade1", args)
})

app.get("/", (req, res) => {
    args = { 
        titulo:"Ola " + req.query.nome, 
        descricao:"Página Criada com Mustache para As Atividades",
        menu: [
            {url:'/page1', label: 'Atividade 1'}, 
            {url:'/page2', label: 'Atividade 2'}, 
            {url:'/page3', label: 'Atividade 3'}, 
            {url:'/page4', label: 'Atividade 4'}
        ]
    }
    res.render("teste", args)
})

app.get("/page2", (req, res) => {
    res.render("page2")
})

app.post("/teste", (req, res) => {
    console.log(req.body)
    res.end(JSON.stringify(req.body))
})

const validador = require('./exemplo.js')
app.get("/valida", validador, (req, res) => {
    if (res.error) {
        res.end("Error: " + res.error)
    } else {
        res.end("finalizado! " + req.query.id)
    }
    
})

app.listen(3000, ()=>{
    console.log("Running...")
})

