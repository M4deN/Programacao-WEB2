const express = require('express')
const router = express.Router()

const Acesso = require('../helpers/acesso')
const Eventos = require('../models/Evento')
const Usuario = require('../models/Usuario')

router.get("/", (req, res) => {
    let error = ""
    if (req.session.messages != undefined) {
        error = req.session.messages.pop()
    }
    res.render("index", {
        eventos: Eventos.publicos(), 
        email: req.cookies.email,
        error: error
    })
})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

router.get("/intranet", Acesso.estaLogado, (req, res) => {
    res.render("restrito", {eventos: Eventos.privados(), 
                            usuario: req.user.nome, 
                            isAdmin: Usuario.isAdmin(req.user)})
})

router.get("/admin", Acesso.ehAdmin, (req, res) => {
    res.render("admin", {eventos: Eventos.todos(), usuario: "Admin"})
})

module.exports = router