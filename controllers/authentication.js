const User = require("../models/user");
const { body, validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {

    const errors = validationResult(req);

    validator(errors, res);

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err : err
            });
        } 

        res.json({
            name : user.name,
            phoneNumber : user.phoneNumber,
            id : user._id
        });
    } )

}

exports.signin = (req, res) => {
    const errors = validationResult(req);

    validator(errors, res);

    const {phoneNumber, password} = req.body;

    User.findOne( { phoneNumber }, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : "User Not Found"
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Incorrect Password"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        res.cookie("token", token, {expire : new Date() + 365});

        const { _id, name, phoneNumber, role } = user;
        return res.json({token, user: {_id, name, phoneNumber, role}});
    })


}

exports.signOut = (req, res) => {
    res.json({ user: 'Sign Out Guys' });
}

function validator(errors, res) {
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error : errors.array()[0].msg,
            err : errors.array()[0].param
        });
    }
}
