const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../model/user')
const env = require('../config/env')

passport.use(new googleStrategy({
    clientID : env.clientID,
    clientSecret : env.clientSecret,
    callbackURL : env.callbackURL
},
(accessToken,refreshToken,profile,done)=>{
try {
  const user =  User.findOne({email : profile.emails[0].value}).exec()
  console.log("profile",user)
    if(user){
   return done(null,user)
    }else {
        User.create({
            name : profile.displayName,
            email : profile.emails[0].value,
            password : crypto.randomBytes(20).toString('hex')
        })
        return done(null,user)
    }
} catch (error) {
   console.log('error in genrating in google passport',error)
   return done(null,false)
}
}
))