const express = require('express');
const app = express();
const Joi = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Conectado ao MongoDB...'))
.catch(err => console.error('Não foi possível conectar ao MongoDB...', err));

app.use(express.json());
const tarefaSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    concluida: { type: Boolean, required: true }
});

const TarefaModel = mongoose.model('Tarefa', tarefaSchema);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Tarefas');
});

app.get('/tarefas', async (req, res) => {
    const tarefas = await TarefaModel.find();
    res.send(tarefas);
});

app.get('/tarefas/:id', async (req, res) => {
    const tarefa = await TarefaModel.findById(req.params.id);
    if (!tarefa) return res.status(404).send('Tarefa não encontrada.');
    res.send(tarefa);
});

app.post('/tarefas', async (req, res) => {
    const { error } = validarTarefa(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const tarefa = new TarefaModel({
        descricao: req.body.descricao,
        concluida: req.body.concluida
    });

    await tarefa.save();
    res.send(tarefa);
});

app.put('/tarefas/:id', async (req, res) => {
    const { error } = validarTarefa(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const tarefa = await TarefaModel.findByIdAndUpdate(req.params.id, {
        descricao: req.body.descricao,
        concluida: req.body.concluida
    }, { new: true });

    if (!tarefa) return res.status(404).send('Tarefa não encontrada.');

    res.send(tarefa);
});

app.delete('/tarefas/:id', async (req, res) => {
    const tarefa = await TarefaModel.findByIdAndRemove(req.params.id);
    if (!tarefa) return res.status(404).send('Tarefa não encontrada.');
    res.send(tarefa);
});

function validarTarefa(tarefa) {
    const schema = Joi.object({
        descricao: Joi.string().required(),
        concluida: Joi.boolean().required()
    });

    return schema.validate(tarefa);
}

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});