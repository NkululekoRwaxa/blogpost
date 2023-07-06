/**
 * check if the user is authenticated, and if so, 
 * prevent them from accessing the login/register page
 */
module.exports = (req, res, next) =>{
    if(req.session.userId){
        return res.redirect('/') // if user logged in, redirect to home page
    }
    next();
}