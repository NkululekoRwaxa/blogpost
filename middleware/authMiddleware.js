/**
 * protect pages that we don't want assessed by users NOT logged in
 * an unauthenticated user can’t access the new post form and submit a blog post
 */
const User = require('../models/User');

module.exports = (req, res, next)=>{
    User.findById(req.session.userId)
    .then(user=>{
        if(!user){
            res.redirect('/');
        }
    }).catch(e=>{
        res.redirect('/');
    });
    next();
}