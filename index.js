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
let reqCounter = 0;

function countReq(request, response, next){
    reqCounter++;
    console.log(reqCounter);
    return next();
}
function checkProjectInArray(request,response,next) {
    if(!projects[request.params.id]) {
        return response.status(400).json({
            error: "The project still doesn't exist"
        });
    }
    return next();
}
app.get('/', countReq, (request, response) => {
    return response.json(projects);
});

app.get('/projects/:id', countReq, checkProjectInArray, (request,response) => {
    const { id } = request.params;
    return response.json(projects[id]);
});

app.post('/projects', countReq, (request, response) => {
    const { id, title } = request.body;
    const tasks = [];
    projects.push({id,title,tasks});
    return response.json(projects[id]);
});

app.post('/projects/:id/tasks', countReq, checkProjectInArray, (request, response) => {
    const { id } = request.params;
    const { title } = request.body;
    projects[id].tasks.push(title);
    return response.json(projects[id]);
});

app.put('/projects/:id', countReq, checkProjectInArray, (request, response) => {
    const { id } = request.params;
    const { title } = request.body;
    projects[id].title = title;
    return response.json(projects[id]);
});

app.delete('/', countReq, (request, response) => {

});

app.listen(3333);

