
const db = require("../models");
const jwt = require("jsonwebtoken");


exports.signin = async function (req, res, next) {
    try {
        // finding a user 
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { _id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        // checking if their password mathches that was sent to the serever
        // if it all matches :
        if (isMatch) {
            /// log them in
            let token = jwt.sign({
                _id,
                username,
                profileImageUrl
                },
                process.env.SECRET_KEY
            ); 
            return res.status(200).json({
                _id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email / Password . "
            });
        }
    }
    catch (e) {
        return next({
            status: 400,
            message: "Invalid Email / Password . "
        })
    }
    
};

exports.signup = async function (req, res, next) {
    try {
        //create a user
        let user = await db.User.create(req.body);
        let { _id, username, profileImageUrl } = user;
        // create a token {signing a token }
            //process.env.SECRET_KEY
        let token = jwt.sign(
            {
                _id,
                username,
                profileImageUrl
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            _id,
            username,
            profileImageUrl,
            token
        })
    } catch (err) {
        // see what kind of error
            // if a validation fails !
            // respond with username/email alreadey taken
            // if it is a certain error
        if (err.code === 11000) {
            err.message = "Sorry , that username and/or email is taken";
        }
        //otherwise just send back a generic 400
        return next({
            status: 400,
            message:err.message
        })
    }
}