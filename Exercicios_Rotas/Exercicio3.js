const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
  const usuario = req.query.usuario;
  const senha = req.query.senha;

  if (senha.includes(usuario)) {
    res.send('Usuário possui permissão de acesso');
  } else {
    res.send('Usuário não possui permissão de acesso');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/*Mude o arquivo no package.json no start instancie esse script.
Abra o seu navegador e acesse a URL http://localhost:3000/login?usuario=exemplo&senha=exemplo.
Substitua os valores de "usuario" e "senha" pelos valores que deseja testar.
Pressione a tecla "Enter" para enviar a requisição.
Aguarde a resposta do servidor, que será exibida na tela do navegador.
O resultado será exibido no navegador, como a mensagem de permissão de acesso caso a senha esteja contida no nome do usuário ou a mensagem de negação de acesso caso contrário.*/