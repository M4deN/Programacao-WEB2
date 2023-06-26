const Usuario = require('../models/Usuario')
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    let config = {
        usernameField: "email", passwordField: "senha"
    }
    passport.use(new LocalStrategy(config, (email, senha, done) => {
        let usuario = Usuario.getByLogin(email, senha)
        if (usuario == null)
            return done(null, false, {message: "Falha ao realizar o login"})
        return done(null, usuario)
    }))

    passport.serializeUser((usuario, done) => {
        return done(null, usuario.email)
    })

    passport.deserializeUser((email, done) => {
        return done(null, Usuario.getByEmail(email))
    })
}