const express = require('express');
const app = express();
const port = 3000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(express.json());

app.get('/', (req, res) => {    
    res.send('Hello World!');
});
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined & job != undefined){
        let result = findUserByName_Job(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    
    }
});
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

// Implementation to delete a user
app.delete('/user/:id', (req,res) =>{
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        const del_user = req.body;
        delUser(del_user);
        res.status(200).end()
    }

});



function delUser(user){
    return users['users_list'].pop(user);
}
function addUser(user){
    users['users_list'].push(user);
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}
// Implementation to find a User by Name and Job
const findUserByName_Job = (name, job) => { 
    users['users_list'].filter( (user) => user['name'] === name); 
    return users['users_list'].filter((user) => user['job']==job);
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      