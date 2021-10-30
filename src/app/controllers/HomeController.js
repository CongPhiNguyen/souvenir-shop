const res = require("express/lib/response");

class HomeController {
    // [GET] /home
    index(req, res){
        const active = {
            type: 'home',
        }
        res.render('home' , { active });
    }
}

module.exports = new HomeController;