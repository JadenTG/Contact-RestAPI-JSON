 ## ContactApp

This is a simple Express.js application that allows users to add, edit, view, and delete contacts.

### Step 1: Create a new directory for your project and initialize a new Node.js project.

### Step 2: Install the required packages.

```
npm install express ejs body-parser fs path
```

### Step 3: Create a new file called `app.js` and add the dependencies:

```javascript
const express = require('express');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
```

### Step 4: Create 4 Ejs files called `add.ejs`, `edit.ejs`, `index.ejs`, and `view.ejs`.


### Step 5: In the `app.js` add the following code to be able to add a contact:

```javascript
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
```

### Step 6: In the `add.ejs` add the following code:

```html
<h1>Add Contact</h1>
<form action="/add" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required><br>
    <label name="phone">Phone Number:</label>
    <input type="tel" id="phone" name="phone" required><br>
    <button type="submit">Add</button>
</form>
<a href="/">Back to Contact List</a>
```

### Step 7: To edit the contacts, in the `app.js` add the following code to be able to edit the contacts.

```javascript
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
```
### Step 8: In the `edit.ejs`, add the following code:

```html
<h1>Edit Contact</h1>
<form action="/edit/<%= id %>" method="post">
    <label for="name">Name: </label>
    <input type="text" id="name" name="name" value="<%= contact.name %>" required><br>
    <label for="email">Email: </label>
    <input type="email" id="email" name="email" value="<%= contact.email %>" required><br>
    <label for="phone">Phone Number: </label>
    <input type="tel" id="phone" name="phone" value="<%= contact.phone %>" required><br>
    <button type="submit">Save</button>
</form>
<a href="/">Back to Contact List</a>
```
### Step 9: To delete the Contact, in the `app.js` add the following code:

```javascript
app.get('/delete/:id', (req,res) => {
    const id = req.params.id;
    contacts.splice(id, 1);
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    res.redirect('/');
});
```
