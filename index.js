const express = require('express');
const app = express();
app.use(express.json());

const projects = [
    {
        "id": "0",
        "title": "Novo projeto",
        "tasks": [
         "Nova tarefa",
        ]
    }
];

// function checkIfProjectExist() {
    
//     if(!user) {

//     }
// }
app.get('/',(request, response) => {
    return response.json(projects);
});

app.get('/projects/:id',(request,response) => {
    const { id } = request.params;
    return response.json(projects[id]);
});

app.post('/projects', (request, response) => {
    const { id, title } = request.body;
    const tasks = [];
    projects.push({id,title,tasks});
    return response.json(projects[id]);
});

app.post('/projects/:id/tasks', (request, response) => {
    const { id } = request.params;
    const { title } = request.body;
    projects[id].tasks.push(title);
    return response.json(projects[id]);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title } = request.body;
    projects[id].title = title;
    return response.json(projects[id]);
});

// app.delete()

app.listen(3333);

