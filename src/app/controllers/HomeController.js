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

    getDataUser(req, res) {
        console.log('hello anh zai')
        console.log(req.session.user);
        res.status(201).send(
            JSON.stringify({
                status: 201,
                dataUser: req.session.user,
            })
        );
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