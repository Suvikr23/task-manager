var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

//creating express app
var app = express();

var route = require('./routes/routes');

const port = 3000;

//connecting to database
mongoose.connect('mongodb://localhost:27017');

//on connection with database
mongoose.connection.on('connected', () => {
    console.log('Connection eshtablished with MongoDB @27017');
})

mongoose.connection.on('error', (err) => {
    if(err){
        console.log('Error in connecting with database: '+err);
    }
})

//middleware
app.use(cors());

//parsing the json
app.use(bodyParser.json());

//connecting to the static 
app.use(express.static(path.join(__dirname, 'public')));

//connecting to the routes file
app.use('/api', route);

app.listen(port, () => {
    console.log('Server started on port: '+port);
})

