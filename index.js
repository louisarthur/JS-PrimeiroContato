const express = require('express');
//express importa uma função.
const server = express();
//servidor vai ouvir uma porta
server.use(express.json());
//query params = ?teste=1
//Route params = /teste/1
//request body = {"name":"Louis", "e-mail": "louisartur.53@gmail.com", "senha":"senha12345"};
server.get('/teste',(req,res) =>{
  const nome = req.query.nome;
  // console.log('testando a aplicação');
  // return res.send('Meu primeiro hello world');
  // return res.json({mensagem:"Hello World denovooooo"});
  return res.json({mensagem:`hello ${nome}`});
});

//retorna usuario por index.

const users = ['Louis', 'Arthur', 'Machado'];
server.get('/usuarios/:index',(req,res) =>{
  const {index} = req.params;
  return res.json(users[index]);
});
//retornando um json com todos os nomes
server.get('/usuarios',(req,res)=>{
  return res.json(users);
})

//adicionando usuarios ao array de usuários.
server.post('/usuarios', (req,res)=>{
  const {name} = req.body;
  users.push(name);
  return res.json(users);
});
//Trocando dados de um  usuário
server.put('/usuarios/:index',(req,res)=> {
  const {index} = req.params;
  const {name} = req.body;
  users[index] = name;
  //retornando todos os usuarios.
  return res.json(users);
});
//deletar usuario
server.delete('/usuarios/:index', (req,res)=>{
  const {index} = req.params;
  users.splice(index,1);
  return res.json(users);
});

server.listen(3030);
// para não reiniciar direto, instalar uma dependencia chamada nodemoon e adicionar a flag no package.json