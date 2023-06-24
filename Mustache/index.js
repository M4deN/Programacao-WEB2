const express = require('express');
const app = express();
const port = 3000;
const Joi = require('joi');
const mustacheExpress = require('mustache-express');

// Configuração da template engine Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

app.get('/home', (req, res) => {
    res.render('home');
  });

app.get('/', (req, res) => {
  res.render('index', { inputText: '', reversedText: '', error: null });
});

app.post('/', (req, res) => {
  const schema = Joi.object({
    inputText: Joi.string().required()
  });

  const { error, value } = schema.validate({ inputText: req.body.inputText });

  const text = value.inputText;
  const reversedText = text.split('').reverse().join('');

  res.render('index', { inputText: text, reversedText: reversedText, error: error ? error.details[0].message : null });
});

app.get('/operacao/:operacao', (req, res) => {
    const { operacao } = req.params;
    const { x, y } = req.query;
  
    // Validando os parâmetros utilizando o JOI
    const schema = Joi.object({
      x: Joi.number().required(),
      y: Joi.number().required(),
      operacao: Joi.string().valid('soma', 'subtracao', 'multiplicacao', 'divisao').required(),
    });
  
    const { error } = schema.validate({ x, y, operacao });
  
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    // Realizando a operação desejada
    let resultado;
    switch (operacao) {
      case 'soma':
        resultado = parseFloat(x) + parseFloat(y);
        break;
      case 'subtracao':
        resultado = parseFloat(x) - parseFloat(y);
        break;
      case 'multiplicacao':
        resultado = parseFloat(x) * parseFloat(y);
        break;
      case 'divisao':
        resultado = parseFloat(x) / parseFloat(y);
        break;
      default:
        resultado = null;
        break;
    }
  
    // Renderizando o arquivo .mustache com o resultado da operação
    res.render('operacao', { operacao, x, y, resultado });
  });
  
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

  