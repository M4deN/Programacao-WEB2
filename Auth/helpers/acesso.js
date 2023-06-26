const Usuario = require('../models/Usuario')

module.exports = {
    estaLogado: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.session.messages = ["Usuário não autenticado"]
        res.redirect("/")
    },
    ehAdmin: function(req, res, next) {
        if (req.isAuthenticated() && Usuario.isAdmin(req.user)) {
            return next()
        }

        if (req.isAuthenticated()) {
            res.redirect("/intranet")
        } else {
            req.session.messages = ["Sem autorização"]
            res.redirect("/")
        }
    },
    login: function(req, res, next) {
        let usuario = Usuario.getByEmail(process.env.ADMIN)
        
        req.login(usuario, (err) => {
            if (!err) res.redirect("/admin")
            else res.redirect("/")
        })
    }
}