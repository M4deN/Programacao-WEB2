const express = require('express');
const app = express();

app.get('/media', (req, res) => {
  const valores = req.query.valores;

  if (!valores) {
    return res.status(400).send('Informe os valores');
  }

  const numeros = valores.split(',').map(Number);
  const soma = numeros.reduce((total, num) => total + num, 0);
  const media = soma / numeros.length;

  res.send(`A média dos valores informados é ${media}`);
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

/* Mude o arquivo no package.json no start instancie esse script
acessar a URL da rota /media com os valores numéricos informados na query string.
Por exemplo, se você estiver executando o servidor na porta 3000 no seu computador, pode acessar a URL http://localhost:3000/media?valores=2,4,6,8 para calcular a média dos valores 2, 4, 6 e 8.
Ao acessar essa URL, você deverá ver a mensagem "A média dos valores informados é 5". Se você informar outros valores na query string, a média será recalculada de acordo.
Caso você queira testar a rota de forma programática, pode utilizar o Postman ou o Insomnia para enviar requisições HTTP para a rota /media com os valores informados na query string.*/