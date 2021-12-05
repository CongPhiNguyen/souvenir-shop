const res = require("express/lib/response");

class Home1Controller {
    // [GET] /home
    index(req, res){
        const active = {
            type: 'home',
            Home: true,
        }
        console.log("active", active)
        res.render('home' , {active});
    }

    renderHome(req, res) {
        const active = {
            type: 'home',
            Home: true,
        }
        console.log("active", active)
        res.render('home', {active,});
    }
}

module.exports = new Home1Controller;