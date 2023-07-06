const User = require('../models/User.js');
const path = require('path');

module.exports = (req,res)=>{
    User.create(req.body)
    .then(user => res.redirect('/'))
    .catch(e =>{
        const validationErrors = Object.keys(e.errors).map(key => e.errors[key].message);
        //req.session.validationErrors = validationErrors;
        req.flash('validationErrors', validationErrors);
        // keep data keyed in
        req.flash('data', req.body);
        res.redirect('/auth/register');
    });
}