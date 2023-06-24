const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();
const port = 3000;

// Configuração do Mustache.js
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static('img'));
// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Página Inicial',
    links: [
      { name: 'Currículo', url: '/cv' },
      { name: 'Disciplinas', url: '/disciplinas' },
      { name: 'Mídia', url: '/midia' },
    ],
  });
});

// Rota para a página de currículo
app.get('/cv', (req, res) => {
    res.render('cv', {
      title: 'Currículo',
      name: 'Alecio Leandro de Medeiros',
      email: 'Alexdesaran@gmail.com',
      phone: '43 12345-6789',
      city: 'Londrina/PR',
      
      "education": [
        { "degree": "Graduação", "field": "Engenharia de Software", "institution": "Universidade Tecnologica Federal do Paraná (UTFPR)" },
        { "degree": "Pós-graduação", "field": "Automação de Testes de API com Postman", "institution": "Udemy" }
      ],
      "experience": [
        {"position": "Trainee","company": "Empresa TCS","start": "01/01/2020","end": "01/01/2021","description": "Documentação de casos de testes, Testes Manuais, Automação de testes"
        },
        {"position": "Analista de Testes/QA","company": "Empresa TCS","start": "01/01/2021","end": "Atual","description": "Documentação de casos de testes, Testes Manuais, Automação de testes"
        }
      ]
    });
  });

// Rota para a página de disciplinas
app.get('/disciplinas', (req, res) => {
  const disciplinas = [
    {codigo:'web', name: 'Programação para WEB 2', resumo: 'Conceitos e estratégias de manipulação de Rotas, uso de Templates, construção e manipulação de API Rest, Integração com Banco de Dados MongoDB ' },
    {codigo:'tcc', name: 'Trabalho de Conclusão de Curso 1', resumo: 'Desenvolvimento e Consolidação de Idéia e metodologia de desenvolvimento de trabalho cientifico' },
    { codigo:'oficina',name: 'Oficina de Integração 2', resumo: 'Desenvolvimento, Integração e documentação de sistema proposto' },
    { codigo:'ger',name: 'Gerência de Configuração', resumo: 'Analise e aplicação de ferramentas de integração contínua em software proposto.'},
    {codigo:'movel',name: 'Programação para Dispositivos Móveis', resumo: 'Desenvolvimento de Aplicação Mobile, com Kotlin ou Java'}
  ];

  res.render('disciplinas', {
    title: 'Disciplinas',
    disciplinas,
  });
});

// Rota para a página de resumo da disciplina
app.get('/disciplinas/:codigo', (req, res) => {
    const codigo = req.params.codigo;
    const resumo = `Resumo da disciplina ${codigo}`;
  
    res.render('disciplina', {
      title: codigo,
      resumo: resumo,
    });
  });

// Rota para a página de mídia
app.get('/midia', (req, res) => {
    res.render('midia', {
      title: 'Mídia',
      redes: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alecio-leandro-medeiros-5b68741a3/' },
        { name: 'GitHub', url: 'https://github.com/M4deN' },
        { name: 'Instagram', url: 'https://www.instagram.com/alexdesaran/' },
      ],
      fotos: [
        { nome: 'Foto 1', url: '/public/img/img1.jpg' },
        { nome: 'Foto 2', url: '/public/img/img2.jpg' },
        { nome: 'Foto 3', url: '/public/img/img3.jpg' },
        { nome: 'Foto 4', url: '/public/img/img4.jpg' },
        { nome: 'Foto 5', url: '/public/img/img5.jpg' },
      ],
    });
  });

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});