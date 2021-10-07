const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");

app.set('view-engine', 'ejs')
app.use(express.static('./public'));

/**
 * opens the main page (reads the todo list)
 */
app.get('/', (req, res) =>
{
    fs.readFile('./data/todos.json', (err, data) =>
    {
        if (err) throw err;
        const todos = JSON.parse(data.toString());
        console.log(todos);
        res.render('./index.ejs', {todos});
    })
    
});

 /**
  * add request
  */
 app.get('/add', (req,res) =>
 {
     
 })

 /**
  * add request
  */
  app.get('/delete/:id', (req,res) =>
  {
      console.log("inside delete");
      fs.readFile('./data/todos.json', (err, data) =>
    {
        if (err) throw err;
        const todos = JSON.parse(data.toString());
        const deleteId = todos.findIndex( x => x.id == req.params.id);
        console.log(todos);
        res.render('./index.ejs', {todos});
    })
  })

/**
 * if no page found
 */
app.use((req, res) =>   
    {
        res.sendFile(path.join(__dirname, '/public/404.html'));
    }
)
app.listen(port);