const res = require("express/lib/response");

class Home2Controller {
    // [GET] /home
    index(req, res){
        res.render('home2', { title: "Blog" , active: {Blog: true }});
    }
}

module.exports = new Home2Controller;