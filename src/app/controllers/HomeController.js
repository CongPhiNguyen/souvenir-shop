const res = require("express/lib/response");

class Home1Controller {
    // [GET] /home
    index(req, res){
        const active = {
            type: 'home',
        }
        res.render('home' , { active });
    }

    renderHome(req, res) {
        const active = {
            type: 'home',
        }
        res.render('home', {active});
    }
}

module.exports = new Home1Controller;