const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = "phuoc123"; // temp private key

function JWTAuthToken(data) {
    return (token = jwt.sign(
        { ...data },
        PRIVATE_KEY,
        { expiresIn: 600 }
    ));
}

function JWTVerify(token) {
    try {
        var decoded = jwt.verify(token,PRIVATE_KEY);
        return ({
            status: 200,
            decoded,
        });
    } catch (err) {
        return ({
            status: 401,
            err,
        })
    }
}

async function AuthMiddleware(req, res, next) {
    const result = JWTVerify(req.body.token);

    if (result.status !== 200) {
        res.status(401).send(JSON.stringify(result.err));
    } else {
        res.locals.decoded = result.decoded;
        next();
    }
}

module.exports = {JWTAuthToken,AuthMiddleware};