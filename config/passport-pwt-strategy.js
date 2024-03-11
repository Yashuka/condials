
const passport = require('passport')
const jwtPassport = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const env = require('../config/env')
const User = require('../model/user')

let opts = {
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.JWT_KEYORSECRET
}

passport.use(new jwtPassport (opts, async function(jwtPayload,done){
    try {
        console.log("iske ander gya h")
       const user = await  User.findById(jwtPayload._id);
       console.log("user", user);
       if(!user){
        return done(null,false)
       }else{
        console.log("user found")
        return done(null,user)
       }
       
      
    } catch (error) {
        console.log("error in jwt", error)
        return done(null,false)
    }}))

    module.exports = passport;