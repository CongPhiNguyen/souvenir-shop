const homeRouter = require('./home')
const productRouter = require('./product')
const home3Router = require('./home3')
const authRouter = require('./auth');
const accountRouter = require('./account');
const { requireAuth, checkUser } = require('../app/middleware/AuthMiddleware');

function route(app) {
    app.get('*', checkUser);
    app.get('/', (req, res) => {
        res.render('home');
    })
    app.use('/home', homeRouter);
    app.use('/home1', home1Router);
    app.use('/home2', home2Router);
    app.use('/home3', home3Router);
    app.use('/account', accountRouter);
    app.use('/', authRouter);
}

module.exports = route;
