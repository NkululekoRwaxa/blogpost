const bcrypt = require('bcrypt')
const User = require('../models/User')
module.exports = (req, res)=>{
    const {username, password} = req.body;
    User.findOne({username:username})
    .then(user =>{
        bcrypt.compare(username, user.username)
        .then(same =>{
            // how to know user is logged in
            req.session.userId = user._id;
            res.redirect('/');
        })
        .catch(()=>{
            res.redirect('/auth/login');
        });
    })
    .catch(()=>{
        res.redirect('/auth/login');
    });
}