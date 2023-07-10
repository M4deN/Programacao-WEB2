const express = require('express');
const app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

/*Escreva uma rota GET que receba por query string um número indeterminado de valores numéricos e retorne a diferença entre o menor e maior valor. O
retorno deve retornar um objeto JSON que contém a lista dos valores recebidos e a diferença entre o maior e menor valor.*/

app.get('/random-combinacoes', (req, res) => {
  const valores = [];

  for (let i = 0; i < 10; i += 2) {
    const valor1 = Math.floor(Math.random() * 10);
    const valor2 = Math.floor(Math.random() * 10);
    const combinacao = [Math.min(valor1, valor2), Math.max(valor1, valor2)];
    valores.push(combinacao);
  }

  const resposta = { valores };

  res.json(resposta);
});

/*Escreva uma rota GET que retorne valores de 0 a 9 combinados de 2 em 2 de modo aleatório. Exemplo de um retorno:
{ valores: [[0, 3], [1, 5], [6, 9], [2, 4], [7, 8]] } O retorno é no formato JSON; o menor valor deve vir antes do maior valor para
cada par de valores; cada requisição deve gerar novas combinações.*/

app.get('/numeros-diferenca', (req, res) => {
  const valores = req.query.valores;

  if (!valores || !Array.isArray(valores) || valores.length === 0) {
    return res.status(400).json({ erro: 'É necessário uma lista de valores numéricos' });
  }

  const valoresNumericos = valores.map(Number);
  const menorValor = Math.min(...valoresNumericos);
  const maiorValor = Math.max(...valoresNumericos);
  const diferenca = maiorValor - menorValor;

  const resposta = {
    valores: valoresNumericos,
    diferenca: diferenca
  };

  res.json(resposta);
});

/*Escreva um middleware de aplicação que realiza um contador de acesso para cada sessão, note que ao abrir uma janela anônima ou outro navegador, a
contagem é diferente, uma vez que isso representa uma nova sessão.
ATIVIDADE 3 E 4 JUNTAS ABAIXO*/

//middleware gerei uma chave usando biblioteca cripto nativa do node, peguei de parte do meu projeto é usada na sessão
const generateRandomKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const chaveSecreta = generateRandomKey();
console.log("chave gerada: ", chaveSecreta);

app.use(session({
  secret: chaveSecreta,
  resave: false,
  saveUninitialized: true,
}));

const contadorMiddleware = (req, res, next) => {
  if (!req.session.accessCount) {
    req.session.accessCount = 1;
    req.session.firstAccess = new Date().toLocaleString();
  } else {
    req.session.accessCount++;
  }
  next();
};

app.get('/atv4', contadorMiddleware, (req, res) => {
  const templateData = {
    accessCount: req.session.accessCount,
    firstAccess: req.session.firstAccess
  };

  res.render('atv4', templateData);
});

/*Escreva uma rota POST que receba 2 parâmetros usuario e senha e retorne um objeto JSON contendom um token JWT que contém o nome do usuário em caso
de acesso autorizado e retorne uma string vazia no caso de acesso negado. O acesso autorizado será obtido se o nome do usuário for maior do que 5
caracteres e o valor da senha for igual as 4 primeiras letras do nome do usuário.*/

const chaveSecretas = 'token gerado pelo jwt';
const usuario = 'Alecio';
const token = jwt.sign({ usuario }, chaveSecretas);

console.log('Token gerado:', token);

app.get('/protegida', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.decode(token);
    const nomeUsuario = decoded.usuario;

    res.json({ nomeUsuario });
  } catch (error) {
    res.status(401).json({ erro: 'Token inválido' });
  }
});

/*Escreva uma rota POST que receba 2 parâmetros usuario e senha e retorne um objeto JSON contendom um token JWT que contém o nome do usuário em caso
de acesso autorizado e retorne uma string vazia no caso de acesso negado. O acesso autorizado será obtido se o nome do usuário for maior do que 5
caracteres e o valor da senha for igual as 4 primeiras letras do nome do usuário.*/

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario.length > 5 && senha === usuario.slice(0, 4)) {
    const token = jwt.sign({ usuario }, chaveSecreta);
    res.json({ token });
  } else {
    res.json({ token: '' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});