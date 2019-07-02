const express = require('express');
//express importa uma função.
const server = express();
//servidor vai ouvir uma porta
server.use(express.json());


//criando um interceptador global o middleware
//middleware em formato de log, informando o método utilizado e a url
server.use((req,res,next)=> {
  console.time('request');
  console.log(`método: ${req.method}; URL: ${req.url};`);

  next();
  console.timeEnd('request');
}
);
//middleware local, para checagem de usuario
function ChecagemDeExistenciaDeUsuario(req,res,next) {
  if(!req.body.name){
    return res.status(400).json({error:'usuario não encontrado'});
  }
  return next();
}
//middleware local, para verifcação de index de array
function ChecagemDeIndex(req,res,next){
  const user = users[req.params.index]
  if(!user){
    return res.status(400).json({error:'usuario não existe'});
  }
  //não entendi essa parte
  req.user = user;
  return next();
}

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
server.get('/usuarios/:index',ChecagemDeIndex,(req,res) =>{
  // const {index} = req.params;
  return res.json(req.user);
});
//retornando um json com todos os nomes
server.get('/usuarios',(req,res)=>{
  return res.json(users);
})

//adicionando usuarios ao array de usuários.
server.post('/usuarios',ChecagemDeExistenciaDeUsuario,(req,res)=>{
  const {name} = req.body;
  users.push(name);
  return res.json(users);
});
//Trocando dados de um  usuário
server.put('/usuarios/:index',ChecagemDeExistenciaDeUsuario,ChecagemDeIndex,(req,res)=> {
  const {index} = req.params;
  const {name} = req.body;
  users[index] = name;
  //retornando todos os usuarios.
  return res.json(users);
});
//deletar usuario
server.delete('/usuarios/:index',ChecagemDeIndex, (req,res)=>{
  const {index} = req.params;
  users.splice(index,1);
  return res.json(users);
});

server.listen(3030);
// para não reiniciar direto, instalar uma dependencia chamada nodemoon e adicionar a flag no package.json