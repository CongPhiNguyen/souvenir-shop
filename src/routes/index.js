const homeRouter = require('./home')
const productRouter = require('./product')
const home3Router = require('./home3')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const cartRouter = require('./cart')
const authRouter = require('./auth');
const accountRouter = require('./account');
const { requireAuth, checkUser } = require('../app/middleware/AuthMiddleware');
const blogRouter = require('./blog');

function route(app) {
    app.get('*', checkUser);
    app.get('/', (req, res) => {
        res.render('home');
    })
    app.get('/home', (req, res) => {
        res.render('home');
    })
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
    app.use('/home3', home3Router);
    app.use('/account', accountRouter);
    app.use('/blog', blogRouter);
    app.use('/', authRouter);
}
module.exports = route;
