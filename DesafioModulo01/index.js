const express = require('express');

const server = express();

server.use(express.json());

let numerosdeRequisicoes = 0;
const projects = [];

//middleware global relacionado ao número de requisiçÕes
server.use((req,res,next)=>{
  numerosdeRequisicoes++;
  console.log(`número de requisições ${numerosdeRequisicoes};`);
  next();
});

function checagemProjetoExiste(req,res,next){
    const { id } = req.params;
    //não entendi essa parte.
    const project = project.find(p => p.id === id);
    if(!project){
      return res.status(400).json({error:'projeto não encontrado'});
    }
    return next();
}

//checagem de todos os projetos, retornando o array de projetos
server.get('/projects',(req,res)=>{
  return res.json(projects);
});
//Adiciona um projeto
server.post('/projects', (req,res)=> {
  const { id , title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
});
//Modifica um projeto através de um ID
server.put('/projects/:id',checagemProjetoExiste,(req,res)=>{
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(p => p.id === id);
  project.title = title;
  return res.json(project);
});
server.delete('/projects/:id', checagemProjetoExiste,(req,res)=>{
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checagemProjetoExiste, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(project);
});


server.listen(3333);