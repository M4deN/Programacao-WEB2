const express = require('express');
const app = express();
const Joi = require('joi');

const TarefaModel = require('./models/TarefaModel');

app.use(express.json());

const tarefaModel = new TarefaModel();

// Operação de Listar
app.get('/tarefas', (req, res) => {
  const tarefas = tarefaModel.listar();
  res.send(tarefas);
});

// Operação de Inserir
app.post('/tarefas', (req, res) => {
  const schema = Joi.object({
    descricao: Joi.string().min(3).required(),
    concluida: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { descricao, concluida } = req.body;
  const novaTarefa = { id: tarefaModel.tarefas.length + 1, descricao, concluida };
  tarefaModel.inserir(novaTarefa);

  res.send(novaTarefa);
});

// Operação de Buscar pelo ID
app.get('/tarefas/:id', (req, res) => {
  const { id } = req.params;

  const schema = Joi.number().integer().positive().required();
  const { error } = schema.validate(id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const tarefa = tarefaModel.buscarPorId(parseInt(id));
  if (!tarefa) {
    return res.status(404).send('Tarefa não encontrada');
  }

  res.send(tarefa);
});

// Operação de Alterar
app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;

  const schemaId = Joi.number().integer().positive().required();
  const { error: errorId } = schemaId.validate(id);
  if (errorId) {
    return res.status(400).send(errorId.details[0].message);
  }

  const schemaTarefa = Joi.object({
    descricao: Joi.string().min(3),
    concluida: Joi.boolean(),
  }).min(1);
  const { error: errorTarefa } = schemaTarefa.validate(req.body);
  if (errorTarefa) {
    return res.status(400).send(errorTarefa.details[0].message);
  }

  const tarefaAtualizada = { id: parseInt(id), ...req.body };
  const sucesso = tarefaModel.atualizar(parseInt(id), tarefaAtualizada);
  if (!sucesso) {
    return res.status(404).send('Tarefa não encontrada');
  }

  res.send(tarefaAtualizada);
});

// Operação de Excluir
app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;

  const schema = Joi.number().integer().positive().required();
  const { error } = schema.validate(id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const sucesso = tarefaModel.excluir(parseInt(id));
  if (!sucesso) {
    return res.status(404).send('Tarefa não encontrada');
  }

  res.send('Tarefa excluída com sucesso');
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});