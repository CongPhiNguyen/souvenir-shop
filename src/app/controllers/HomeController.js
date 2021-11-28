const res = require("express/lib/response");

class Home1Controller {
    // [GET] /home
    index(req, res){
        res.render('home', { title: "Home" , active: {Home: true }});
    }
}

module.exports = new Home1Controller;