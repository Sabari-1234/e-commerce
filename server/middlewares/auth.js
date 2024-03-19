exports.authenticate=(req,res,next)=>{
 if(req.isAuthenticated()){
    return next()
 }
 else{
    res.status(400).send('login to access')
 }
}

exports.authorized=(req,res,next)=>{
    if(req.user.role==='admin'){
       return next()
    }
    else{
        res.status(400).send('not allowed unauthorized')
    }

}