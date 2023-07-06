module.exports = (req,res)=>{
    // must be logged in to create blog post
    if(req.session.userId)
    {
        res.render('create', {
            createPost: true
        });
    }
    res.redirect('/auth/login');
}