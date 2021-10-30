const res = require("express/lib/response");

class Home1Controller {
    // [GET] /home
    index(req, res){
        const active = {
            type: 'product',
        }
        res.render('home1', { active });
    }
}

module.exports = new Home1Controller;