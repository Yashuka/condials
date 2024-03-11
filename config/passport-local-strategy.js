
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async function(req, email, password, done){
    try {
        const user = await User.findOne({ email: email });
        
        if (!user || user.password !== password) {
            console.log("User not found or password incorrect");
            return done(null, false);
        }
        
        return done(null, user);
    } catch (err) {
        console.log("Error during authentication:", err);
        return done(err, false);
    }
}));


passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.log("Finding error in code", err);
            return done(err);
        });
});



passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({
        message: "Unauthorized"
    });
};

passport.setAuthenticationUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.User = req.User;
    }
    next();
};


module.exports = passport;
