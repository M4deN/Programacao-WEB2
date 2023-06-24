// Importar as bibliotecas necessárias
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');

// Criar a aplicação Express
const app = express();

// Configurar a sessão
app.use(session({
  secret: 'M4deN@#$',
  resave: false,
  saveUninitialized: false
}));

// Configurar o renderizador de templates Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Configurar o middleware para lidar com dados de formulários
app.use(express.urlencoded({ extended: true }));

// Definir as rotas

// Rota para exibir o formulário de login
app.get('/', (req, res) => {
  res.render('login', { error: null });
});

// Rota para lidar com o envio do formulário de login
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Verificar se o nome de usuário e senha são válidos
  if (username.split('').reverse().join('') === password) {
    // Armazenar o nome de usuário na sessão
    req.session.username = username;

    // Redirecionar para a página de intranet
    res.redirect('/intranet');
  } else {
    // Exibir uma mensagem de erro na página de login
    res.render('login', { error: 'Nome de usuário ou senha inválidos' });
  }
});

// Rota para invalidar a sessão
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Rota para exibir a página de intranet
app.get('/intranet', (req, res) => {
  // Verificar se o usuário está logado
  if (!req.session.username) {
    res.redirect('/');
    return;
  }

  res.render('intranet', { username: req.session.username });
});

// Rota para lidar com o envio do formulário de atualização do nome do usuário
app.post('/salvanome', (req, res) => {
  // Verificar se o usuário está logado
  if (!req.session.username) {
    res.redirect('/');
    return;
  }

  // Atualizar o nome de usuário na sessão
  req.session.username = req.body.username;

  // Redirecionar de volta para a página de intranet
  res.redirect('/intranet');
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});