module.exports = {
    getByLogin: function(email, senha) {
        let usuario = email.substr(0, email.indexOf('@'))
        if (usuario != "" && usuario == senha) {
            return {id:this.toId(email), email: email, nome: usuario}
        }
        return null;
    },

    getByEmail: function(email) {
        let usuario = email.substr(0, email.indexOf('@'))
        return {id:this.toId(email), email: email, nome: usuario}
    },

    isAdmin: function(usuario) {
        let email = usuario.email
        return email == process.env.ADMIN
    },

    toId: function(token) {
        var out = 0, len = token.length;
        for (pos = 0; pos < len; pos++) {
            out += (token.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
        }
        return out % 10000;
    }
}