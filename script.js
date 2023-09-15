const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));

async function readContactFiles() {
    const data = await fs.readFile('./data/contacts.json', 'utf8');
    return JSON.parse(data);
}

async function writeContactsFiles(contacts) {
    await fs.writeFile('./data/contacts.json', JSON.stringify(contacts));
}

app.get('/', async (req,res) => {
    try{
        const contacts = await readContactFiles();
        res.render('index', { contacts });
    } catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/add', (req,res) => {
    try{
        res.render('add');
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

app.post('/add', async (req,res) => {
    try{
        const newContact = req.body;
        const contacts = await readContactFiles();
        contacts.push(newContact);
        await writeContactsFiles(contacts);
        res.redirect('/');
    } catch (err) {
        console.log("error", err)
        res.status(500).send('Internal Server Error');
    }
});

app.get('/edit/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const contacts = await readContactFiles();
        const contact = contacts[id];
        res.render('edit', {id, contacts});
    } catch (err) {
        console.log("error", err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/edit/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const updatedContacts = req.body;
        const contacts = await readContactFiles();
        contacts[id] = updatedContacts;
        await writeContactsFiles(contacts);
        res.redirect('/');
    } catch (err) {
        console.log("error", err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/view/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const contacts = await readContactFiles();
        const contact = contacts[id];
        res.render('view', {contact});
    } catch (err) {
        console.log("error", err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/delete/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const contacts = await readContactFiles();
        contacts.splice(id, 1);
        await writeContactsFiles(contacts);
        res.redirect('/');

    } catch (err) {
        console.log("error", err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
});