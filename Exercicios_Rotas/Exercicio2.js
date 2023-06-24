const express = require('express');
const app = express();
const port = 3000;

app.get('/operacao/:operacao', (req, res) => {
  const x = Number(req.query.x);
  const y = Number(req.query.y);
  let result;

  switch (req.params.operacao) {
    case 'soma':
      result = x + y;
      break;
    case 'subtracao':
      result = x - y;
      break;
    case 'multiplicacao':
      result = x * y;
      break;
    case 'divisao':
      result = x / y;
      break;
    default:
      res.send('Operação inválida');
      return;
  }

  res.send(`O resultado da ${req.params.operacao} entre ${x} e ${y} é ${result}`);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/*Mude o arquivo no package.json no start instancie esse script.
Abra o navegador e digite a seguinte URL: http://localhost:3000/operacao/soma?x=1&y=2.
Substitua "soma" pelo nome da operação que deseja realizar e "x" e "y" pelos valores desejados.
O resultado será exibido no navegador como o resultado da operação desejada.*/