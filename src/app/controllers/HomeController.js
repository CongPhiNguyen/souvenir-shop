const res = require("express/lib/response");

class Home1Controller {
    // [GET] /home
    index(req, res){
        const active = {
            type: 'home',
            Home: true,
        }
        res.render('home' , {active});
    }

    get404(req, res) {
        res.render('404NotFound')
    }    

    renderHome(req, res) {
        const active = {
            type: 'home',
            Home: true,
        }
        res.render('home', {active,});
    }
}

module.exports = new Home1Controller;