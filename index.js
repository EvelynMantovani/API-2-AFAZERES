import express from "express";
const PORTA = 3000;
const server = express();
server.use(express.json());

let tarefas = [
  {
    id: 1,
    titulo: "Comprar mortadela",
    concluida: false
  },
  {
    id: 2,
    titulo: "Estudar para o ENEM",
    concluida: true
  },
  {
    id: 3,
    titulo: "Lavar o cabelo",
    concluida: false
  }
];

let ultimoId = tarefas.length;

server.get("/tarefas", (request, response) => {
  response.json(tarefas);
});

server.post("/tarefas", (request, response) => {
  console.log("Adicionando nova tarefa: ", request.body);
  
  ultimoId++;
  request.body.id = ultimoId;
  tarefas.push(request.body);
  
  response.sendStatus(201); //deu boa
});

server.get("/tarefas/:id", (request, response) => {
  const index = tarefas.findIndex(tarefa => tarefa.id === Number(request.params.id));

  if (index === -1) {
    response.sendStatus(404); // erro
  } else {
    response.json(tarefas[index]);
  }
});

server.patch("/tarefas/:id", (request, response) => {
  const index = tarefas.findIndex(tarefa => tarefa.id === Number(request.params.id));

  if (index === -1) {
    response.sendStatus(404);
  } else {
    request.body.id = tarefas[index].id;
    tarefas[index] = request.body;

    response.json(tarefas[index]);
  }
});

server.delete("/tarefas/:id", (request, response) => {
  const index = tarefas.findIndex(tarefa => tarefa.id === Number(request.params.id));

  if (index === -1) {
    response.sendStatus(404);
  } else {
    tarefas.splice(index, 1);
    response.sendStatus(200);
  }
});

server.listen(PORTA, () => {
  console.log("Servidor de tarefas rodando na porta:", PORTA);
});
