module.exports = function(req, res, next) {
    if (req.body.lembrar) {
        res.cookie("email", req.body.email, {maxAge: 7 * 24 * 60 * 60 * 1000})
    } else {
        res.clearCookie("email")
    }
    return next()
}