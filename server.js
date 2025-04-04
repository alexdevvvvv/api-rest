const express = require('express');
const app = express();
const port = 3000;

//middleware
app.use(express.json());

const users = [
    {id: 1, name: 'John', email: 'john@gmail.com'},
    {id: 2, name: 'Jane', email: 'jane@gmail.com'},
    {id: 3, name: 'Jim', email: 'jim@gmail.com'},
]

//routes
app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({message: 'User not found'});
    res.json(user);
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({message: 'User not found'});
    users.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

