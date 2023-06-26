const Joi = require('joi')

const schema = Joi.object({
    id: Joi.number().integer().min(0).required(),
    uf: Joi.string().min(2).max(2).required(),
    email: Joi.string().email()
})

module.exports = function (req, res, next) {
    const {error, value} = schema.validate(req.query);
    if (error) {
        //res.status(500).end(error.details[0].message)
        res.error = error.details[0].message
        return next();
    }
    req.query = value;
    next();
}