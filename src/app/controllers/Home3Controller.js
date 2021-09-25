const res = require("express/lib/response");

class Home3Controller {
    // [GET] /home
    index(req, res){
        res.render('home3');
    }
}

module.exports = new Home3Controller;