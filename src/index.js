const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphandlebars = require('express-handlebars');
const route = require('./routes');
const connectDB = require('./config/connectDb');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser')
const session = require('express-session');

// Connect mongoDb
connectDB();

//middlewares
app.use(cookieParser('secret'))
app.use(session({cookie: {maxAge: null}}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
// app.use(morgan('combine'));
// Template engine
app.engine('hbs', exphandlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

