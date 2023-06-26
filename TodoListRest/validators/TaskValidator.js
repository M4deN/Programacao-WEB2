const Joi = require("joi")

const TaskSchema = Joi.object({
    id: Joi.number()
        .integer()
        .greater(0),
    nome: Joi.string()
        .min(3)
        .max(30)
        .required()
}).with("id", "nome")

module.exports = {
    validateId: function(req, res, next) {
        const {error, value} = Joi.number().integer().greater(0).validate(req.params.id)

        if (error) {
            return res.status(500).json({status: false, msg: "O código não é válido"});
        }

        req.params.id = value
        return next()
    },
    validateNome: function(req, res, next) {
        const {error, value} = TaskSchema.validate(req.body);
        if (error) {
            return res.json({status: false, msg: "Dados incompletos"})
        }
        req.body = value
        return next()
    }
}