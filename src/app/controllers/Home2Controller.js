const res = require("express/lib/response");

class Home2Controller {
    // [GET] /home
    index(req, res){
        res.render('home2');
    }
}

module.exports = new Home2Controller;