const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded());
app.set('view-engine', 'ejs')
app.use(express.static('./public'));

 // ============================================== opens main page (reads the todo list) ================================
app.get('/', (req, res) =>
{
    fs.readFile('./data/todos.json', (err, data) =>
    {
        if (err) throw err;
        const todos = JSON.parse(data.toString());
        res.render('./index.ejs', {todos});
    })
});
 // ============================================== add todo ================================
 app.post('/add', (req, res) =>
 {
     console.log("insied add");
     fs.readFile('./data/todos.json', (err, data) =>
     {
         if (err) throw err;
         const todos = JSON.parse(data.toString());
         todos.push(req.body);
         fs.writeFile('./data/todos.json', JSON.stringify(todos, null, 4), (err) =>
         {
            if (err) throw err;

         })
         res.redirect('./');
     })
 });

 // =============================================== toggle todo checked request =====================================
 app.get('/toggleTodoChecked/:todoId', (req,res) =>
 {
    console.log("inside toggle todo");
    console.log(req.params.todoId);
    fs.readFile('./data/todos.json', (err, data) =>
    {
        if (err) throw err;
        let todos = JSON.parse(data.toString());
        const id = todos.findIndex( x => x.id == req.params.todoId);
        todos[id].isChecked = todos[id].isChecked == "checked"? "" : "checked";
        fs.writeFile('./data/todos.json', JSON.stringify(todos, null, 4), (err) => {
            if (err) throw err;
        });
        res.redirect('/');
    });
 })

  // ================================================= delete todo =================================================
   app.get('/delete/:id', (req,res) =>
  {
      console.log("inside delete");
      fs.readFile('./data/todos.json', (err, data) =>
    {
        if (err) throw err;
        let todos = JSON.parse(data.toString());
        todos.splice(todos.findIndex( x => x.id == req.params.id), 1);
        fs.writeFile('./data/todos.json', JSON.stringify(todos, null, 4), (err) => {
            if (err) throw err;
        });
        res.redirect('/');
    })
  })

 // ============================================== if no page found ======================================
app.use((req, res) =>   
    {
        res.sendFile(path.join(__dirname, '/public/404.html'));
    }
)
app.listen(port);