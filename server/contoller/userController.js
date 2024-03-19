const { hashSync, compareSync } = require("bcrypt")

const User=require('../models/userModel')

const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken'); 


exports.register=async(req,res)=>{
    try{
           const {name,email,password,avatar}=req.body
           const user=await User.create({
            name,
            email,
            password:hashSync(password,10) ,
            avatar
           })
           res.send(user)
    }
    catch(err){
        res.send('error')
    }
}
exports.protected=(req,res)=>{
       if(req.isAuthenticated()){
          res.send('protected')
        }
        else{
          res.send('unauthorized')
        }
        console.log(req.user)
        console.log(req.session)
}

exports.logout=(req,res)=>{
        req.logout(()=>res.redirect(''))
}

exports.forgetPassword=(req,res)=>{
  const {email}=req.body
  const transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
      user: 'mr.360andvk@gmail.com', 
      pass: 'sqfhnacwkyfocuop' 
    } 
  }); 
  
  const token = jwt.sign({ 
      email
    }, process.env.TOKEN_SECRETE, { expiresIn: '10m' } 
  );	 
  
  const mailConfigurations = { 
  
    
    from: 'mr.360andvk@gmail.com', 
  
    to: email, 
  
    
    subject: 'Email Verification', 
    
     
    text: `Hi! There, You have recently visited 
      our website and entered your email. 
      Please follow the given link to verify your email 
      http://localhost/api/v1/resetPassword?token=${token} 
      Thanks` 
    
  }; 
  
  transporter.sendMail(mailConfigurations, function(error, info){ 
    if (error) res.status(400).send(error)
    res.status(200).send('Email Sent Successfully'); 
     
  }); 
  
}

exports.resetPassword=(req,res)=>{
  
    const {newPassword}=req.body
    const {token}=req.query
    jwt.verify(token,process.env.TOKEN_SECRETE, async (error,decoded)=>{
      try{
      if(error){
        res.status(400).send('token invalid')
      }
      else{
       
       const user=await User.findOneAndUpdate({email:decoded.email},{password:hashSync(newPassword,10)})
       res.status(200).send(user)
      }}
      catch(err){
        res.status(400).send(err)
    }
    })
}

exports.getProfile=(req,res)=>{
  res.status(200).send(req.user)
}

exports.updateProfile=async(req,res)=>{
  try{
    const {name,email,avatar}=req.body
    const user=await User.findByIdAndUpdate(req.user.id ,{name,email,avatar},{
      new:true,
      runValitators:true
  })
    res.status(200).send(user)

  }
  catch(err){
    res.status(400).send(err)
  }


}

exports.updatePassword=async(req,res)=>{
  try{

    if(!compareSync(req.body.oldPassword,req.user.password)){
      return res.status(400).send('old password is incorrect')
     }
     const user=await User.findByIdAndUpdate(req.user.id,{password:hashSync(req.body.newPassword,10)},{
      new:true,
      runValitators:true
  })
     res.status(200).send(user)
  }
  catch(err){
    res.status(400).send(err)
  }
 
 
}


exports.getAllUser=async(req,res)=>{
  try{
    const user=await User.find()
    res.status(200).send(user)
  }
  catch(err){
    res.status(400).send(err)
  }
 
}

exports.getSingleUser=async(req,res)=>{
 try{
  const user=await User.findById(req.params.id)
  res.status(200).send(user)
 }
 catch(err){
  res.status(400).send(err)
 }
}

exports.updateUser=async(req,res)=>{
try{
  const user=await User.findById(req.params.id)
  if(!user){
    return res.status(400).send('user not found')
  }
  if(user.id===req.user.id){
    return res.status(400).send('cant update your own role')
  }
  const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValitators:true
})

res.status(200).send(updatedUser)

 }
catch(err){
  res.status(400).send(err)
}
}

exports.deleteUser=async(req,res)=>{
try{
  const user=await User.findById(req.params.id)
  if(!user){
    return res.status(400).send('user not found')
  }
  const deletedUser=await User.findByIdAndDelete(req.params.id)
  res.status(200).send(deletedUser)
}
catch(err){
  res.status(400).send(err)
}
}