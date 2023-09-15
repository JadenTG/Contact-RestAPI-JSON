const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');

const contacts = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf8'))
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.static("./views"));
app.use(express.static("./public"));

app.use(bodyparser.urlencoded({ extended: false}));

app.get('/add', (req,res) => {
    res.render('add');
});

app.get('/', (req,res) => {
    res.render('index', {contacts});
})

app.post('/add', (req,res) => {
    const newContact = req.body;
    contacts.push(newContact);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/');
});

app.get('/edit/:id', (req,res) => {
    let id = req.params.id;
    const contact = contacts[id];
    res.render('edit', {id, contact});
});

app.post('/edit/:id', (req,res) => {
    let id = req.params.id;
    contacts[id] = req.body;
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/');
});

app.get('/view/:id', (req,res) => {
    let id = req.params.id;
    const contact = contacts[id];
    res.render('view', {contact});
});

app.get('/delete/:id', (req,res) => {
    const id = req.params.id;
    contacts.splice(id, 1);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/');
});

app.listen(port, (req,res) => {
    console.log('Server is running', port);
});