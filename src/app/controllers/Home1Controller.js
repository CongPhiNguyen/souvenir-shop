const res = require("express/lib/response");

class Home1Controller {
    // [GET] /home
    index(req, res){
        res.render('home1');
    }
}

module.exports = new Home1Controller;