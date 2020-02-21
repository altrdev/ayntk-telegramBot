const jwt = require('jsonwebtoken');
const netlifyOptions = {iss: "netlify", verify_iss: true, algorithm: "HS256"}

module.exports.replaceAll = function (str, mapObj) {
    const re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
};

module.exports.normalize = function (str) {
    return str.replace("https://", "");
};

module.exports.checkJWS = function checkJWS(req, res, next) {
    try {
        jwt.verify(req.header("X-Webhook-Signature"), process.env.JWS_SECRET || "secret", netlifyOptions);
        next()
    } catch(err) {
        console.log(err)
        res.status(401).json({status: "ko", message: "Auth failed"});
    }
};
