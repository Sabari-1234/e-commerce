
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const User=require('../models/userModel');
const { compareSync } = require('bcrypt');

passport.use(new LocalStrategy(
    function(username, password, done) {
       
      User.findOne({ name :username}).then((user)=>{
      if (!user) { return done(null, false); }
      if (!compareSync(password,user.password)) { return done(null, false); }
      return done(null, user);

      }).catch((err)=>{
        return done(err)
      })
    }
  ));

  passport.serializeUser((user,done)=>{
    done(null,user.id)
  })
  passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
      done(null,user)
  })
    
  })