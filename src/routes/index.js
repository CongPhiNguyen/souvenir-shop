const homeRouter = require('./home')
const productRouter = require('./product')
const home3Router = require('./home3')
const authRouter = require('./auth')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const cartRouter = require('./cart')

function route(app) {
    app.use('/home', homeRouter);
    app.use('/product', productRouter);
    app.use('/cart', cartRouter);
    app.use('/home3', home3Router);
    
    app.use('/', authRouter);
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);
}

module.exports = route;
