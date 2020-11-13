const jwt = require("jsonwebtoken");

// make sure the user is logged - authentication
exports.loginRequired = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please log in first ! "
                });
            }
        });
    } catch (e) {
        return next({status:401, message:"please log in first "})
    }
}


// make sure we get the correct user - authirization
    // api/users/:id/messages
exports.ensureCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        console.log(req.params.id);
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            console.log(decoded);
            if (decoded && decoded._id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized!"
                });
            }
        });
    }
    catch (e) {
        return next({
            status: 401,
            message: "Unauthorized!"
        });
    }
}