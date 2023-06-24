const express = require('express');
const app = express();
const port = 3000;

app.get('/:text', (req, res) => {
  const text = req.params.text;
  const reversedText = text.split('').reverse().join('');
  res.send(reversedText);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//Mude o arquivo no package.json no start instancie esse script.
//Abra o navegador e digite a seguinte URL: http://localhost:3000/seutextoaqui.
//Substitua "seutextoaqui" pelo texto que deseja inverter e pressione Enter.
//O resultado será exibido no navegador como o texto invertido.