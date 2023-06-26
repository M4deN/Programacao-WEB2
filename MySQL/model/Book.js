const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require("../helpers/mysql")

const BookModel = sequelize.define('Book', 
    {
        nome: DataTypes.STRING,
        autor: DataTypes.STRING,
        editora: DataTypes.STRING,
        ano: DataTypes.INTEGER
    }
)

BookModel.sync()

module.exports = {
    list: async function() {
        const books = await BookModel.findAll()
        return books
    },
    
    save: async function(nome, autor, editora, ano) {
        const book = await BookModel.create({
            nome: nome,
            autor: autor,
            editora: editora,
            ano: ano
        })
        return book
    },

    update: async function(id, obj) {
        
        let book = await BookModel.findByPk(id)
        if (!book) {
            return false
        }
        
        Object.keys(obj).forEach(key => book[key] = obj[key])
        await book.save()
        return book
    },

    delete: async function(id) {
        const book = await BookModel.findByPk(id)
        return book.destroy()
    },

    getById: async function(id) {
        return await BookModel.findByPk(id)
    }
}