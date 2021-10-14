const homeRouter = require('./home')
const home1Router = require('./home1')
const home2Router = require('./home2')
const home3Router = require('./home3')
const authRouter = require('./auth')

function route(app) {
    app.use('/home', homeRouter);
    app.use('/home1', home1Router);
    app.use('/home2', home2Router);
    app.use('/home3', home3Router);
    
    app.use('/', authRouter);
}

module.exports = route;
