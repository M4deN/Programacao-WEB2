const express = require("express")
const router = express.Router()

const {sucess, fail} = require("../helpers/resposta")
const BookDAO = require("../model/Book")

router.get("/", (req, res) => {
    BookDAO.list().then((books) => {
        res.json(sucess(books, "list"))
    })
})

router.get("/:id", (req, res) => {
    BookDAO.getById(req.params.id).then(book => {
        res.json(sucess(book))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Não foi possível localizar o livro"))
    })
})

router.post("/", (req, res) => {
    const {nome, autor, editora, ano} = req.body

    //TODO validar os campos

    BookDAO.save(nome, autor, editora, ano).then(book => {
        res.json(sucess(book))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar o novo livro"))
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {nome, autor, editora, ano} = req.body

    //TODO validar os campos
    let obj = {}
    if (nome) obj.nome = nome
    if (autor) obj.autor = autor
    if (editora) obj.editora = editora
    if (ano) obj.ano = ano

    if (obj == {}) {
        return res.status(500).json(fail("Nenhum atributo foi modificado"))
    }

    BookDAO.update(id, obj).then(book => {
        if (book)
            res.json(sucess(book))
        else
            res.status(500).json(fail("Livro não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar o livro"))
    })
})

router.delete("/:id", (req, res) => {
    BookDAO.delete(req.params.id).then(book => {
        if (book)
            res.json(sucess(book))
        else
            res.status(500).json(fail("Livro não encontrado"))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir o livro"))
    })
})

module.exports = router