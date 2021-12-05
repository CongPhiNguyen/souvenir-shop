const res = require("express/lib/response");

class Home3Controller {
    // [GET] /home
    index(req, res){
        res.render('home3' , { title: "Blog" , active: {Blog: true }});
    }
}

module.exports = new Home3Controller;