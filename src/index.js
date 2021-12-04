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


app.use(express.static('public'))


//middlewares
app.use(cookieParser('secret'))
app.use(session({cookie: {maxAge: null}}))

//flash message middleware
app.use((req, res, next)=>{
  res.locals.message = req.session.message
  delete req.session.message
  next()
})
// Connect mongoDb
connectDB();


// // Connect to database
// db.connect();

// // Khắc phục [nodemon] app crashed - waiting for file changes before starting...
// load('config')
//   .then('routes')
//   .into(app);
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

// register handlebars function
var hbs = exphandlebars.create({});
hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

  switch (operator) {
      case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
          return options.inverse(this);
  }
});

hbs.handlebars.registerHelper('toDateTimeString', function (datetime) {
    var datetimeString = datetime.toDateString() + ' ' + datetime.toTimeString().substring(0, 5);
    return datetimeString;
});


//route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


