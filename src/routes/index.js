const homeRouter = require('./home')
const home1Router = require('./home1')
const home2Router = require('./home2')
const home3Router = require('./home3')
const loginRouter = require('./login')
const signupRouter = require('./signup')


function route(app) {
    app.get('/', (req, res) => {
        res.render('home');
    })
    app.use('/home', homeRouter);
    app.use('/home1', home1Router);
    app.use('/home2', home2Router);
    app.use('/home3', home3Router);
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);
}

module.exports = route;
