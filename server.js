var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var app = express();
var port = process.env.PORT || 8000;
app.use(bodyParser.json());

//Create User
app.post('/create', (req, res)=>{
    let rawData = fs.readFileSync('./storage.json', 'utf8')
    let user = req.body
    let data;
    if(rawData === ''){
        data = [];
    } else {
        data = JSON.parse(rawData)
    }
    data.push(user);
    fs.writeFileSync('./storage.json', JSON.stringify(data))
    res.send('New user added')
});

// GET route for all users

app.get('/', (req, res)=>{
    let rawData = fs.readFileSync('./storage.json', 'utf8')
    res.send(rawData)
})

// GET user by name

app.get('/:name', (req, res)=>{
    let rawData = fs.readFileSync('./storage.json', 'utf8')
    let data = JSON.parse(rawData);
    let result = data.filter(item => item.name === req.params.name)[0];
    if (result){
        res.json(result)
    } else {
        res.sendStatus(400)
    }
});

// Update user by name

app.patch('/:name', (req, res)=>{
    let rawData = fs.readFileSync('./storage.json', 'utf8')
    let user = req.body
    let data = JSON.parse(rawData)
    for(let i = 0; i < data.length; i++){
        if (data[i]['name'] === req.params.name){
            data.splice(i, 1, user)
            fs.writeFileSync('./storage.json', JSON.stringify(data))
            res.send('updated')
        }
    }
})

// Delete user by name

app.delete('/delete/:name', (req, res) => {
    let rawData = fs.readFileSync('./storage.json', 'utf8')
    let data = JSON.parse(rawData)
    for (let i = 0; i < data.length; i++) {
        if (data[i]['name'] === req.params.name) {
            data.splice(i, 1,)
            fs.writeFileSync('./storage.json', JSON.stringify(data))
            res.send('deleted')
        }
    }
});

app.use(function(req, res) {
    res.sendStatus(404);
  });
  
  app.listen(port, function() {
    console.log('Listening on port', port);
  });