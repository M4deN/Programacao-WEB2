const express = require('express');
const app = express();
const port = 3000;

const palavras = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'Ut', 'enim', 'ad', 'minim', 'veniam,', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
  'commodo', 'consequat', 'Duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
  'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
  'pariatur', 'Excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
  'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
  'est', 'laborum'
];

function gerarTexto(numCaracteres) {
  let texto = '';
  while (texto.length < numCaracteres) {
    const palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
    if (texto.length + palavraAleatoria.length + 1 <= numCaracteres) {
      texto += palavraAleatoria + ' ';
    } else {
      break;
    }
  }
  return texto.trim();
}

app.get('/texto/:tipo/:num', (req, res) => {
  const tipo = req.params.tipo;
  const num = parseInt(req.params.num);
  let texto = '';

  if (tipo === 'caracteres') {
    texto = gerarTexto(num);
  } else if (tipo === 'palavras') {
    while (texto.split(' ').length < num) {
      const palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
      texto += palavraAleatoria + ' ';
    }
    texto = texto.trim();
  }

  res.send(texto);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/*Mude o arquivo no package.json no start instancie esse script
Abra o seu navegador e acesse a URL http://localhost:3000/texto/caracteres/50.
Substitua o valor "50" pelo número de caracteres que deseja no seu texto aleatório.
Pressione a tecla "Enter" para enviar a requisição.
Aguarde a resposta do servidor, que será exibida na tela do navegador.
O resultado será um texto aleatório com o número de caracteres solicitado.
Para gerar um texto aleatório com base no número de palavras, acesse a URL http://localhost:3000/texto/palavras/10.*/