const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const Joi = require('joi');
const mustacheExpress = require('mustache-express');

const TarefaModel = require('./models/TarefaModel');

app.use(express.json());

const tarefaModel = new TarefaModel();
const SECRET_KEY = 'maden';

// Configuração do Mustache como view engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Middleware de autenticação via token JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Token não fornecido');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Token inválido');
  }
};

// Rota para exibir o formulário de login
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});


// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = (u => u.email === 'user@email.com' && u.senha === 'maden');
  
  if (!usuario) {
    return res.status(401).send('Credenciais inválidas');
  }

  const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: '1h' });
  res.send({ token });
});



// Operação de Listar
app.get('/tarefas', authMiddleware, (req, res) => {
  const tarefas = tarefaModel.listar();
  res.send(tarefas);
});

// Operação de Inserir
app.post('/tarefas', authMiddleware, (req, res) => {
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
app.get('/tarefas/:id', authMiddleware, (req, res) => {
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
app.put('/tarefas/:id', authMiddleware, (req, res) => {
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
app.delete('/tarefas/:id', authMiddleware, (req, res) => {
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
  
    tarefaModel.excluir(parseInt(id));
    res.send('Tarefa excluída com sucesso');
  });

  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});

/*
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const Joi = require('joi');

const TarefaModel = require('./models/TarefaModel');

app.use(express.json());

const tarefaModel = new TarefaModel();
const SECRET_KEY = 'my_secret_key';

// Middleware de autenticação via token JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Token não fornecido');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Token inválido');
  }
};

// Rota para listar tarefas
app.get('/tarefas', (req, res) => {
  const tarefas = tarefaModel.listar();
  res.send(tarefas);
});

// Rota para criar uma nova tarefa
app.post('/tarefas', (req, res) => {
  const { error } = validarTarefa(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const tarefa = tarefaModel.criar(req.body);
  res.send(tarefa);
});

// Rota para atualizar uma tarefa existente
app.put('/tarefas/:id', (req, res) => {
  const { error } = validarTarefa(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const tarefa = tarefaModel.atualizar(req.params.id, req.body);
  if (!tarefa) {
    return res.status(404).send('Tarefa não encontrada');
  }

  res.send(tarefa);
});

// Rota para excluir uma tarefa existente
app.delete('/tarefas/:id', (req, res) => {
  const tarefa = tarefaModel.excluir(req.params.id);
  if (!tarefa) {
    return res.status(404).send('Tarefa não encontrada');
  }

  res.send(tarefa);
});

// Rota para listar as tarefas do usuário autenticado
app.get('/minhas-tarefas', authMiddleware, (req, res) => {
  const tarefas = tarefaModel.listarPorUsuario(req.user.id);
  res.send(tarefas);
});

// Função para validar a entrada de uma tarefa
function validarTarefa(tarefa) {
  const schema = Joi.object({
    titulo: Joi.string().min(3).required(),
    descricao: Joi.string().min(10).required(),
    concluida: Joi.boolean().required()
  });

  return schema.validate(tarefa);
}

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
*/