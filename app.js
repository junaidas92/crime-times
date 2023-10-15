
const express = require("express")
const bodyParser  = require("body-parser")
const app = express()

const port = 3000

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));

// Template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

// Routes
const newsRouter = require('./src/routes/news');

app.use('/', newsRouter); // Mount the newsRouter at the root path
app.use('/article', newsRouter);

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));