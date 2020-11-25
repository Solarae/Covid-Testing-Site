const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
// const bcrypt=require('bcrypt');
const Employee  = require('../models/Employee');
const LabEmployee = require('../models/LabEmployee')

passport.serializeUser(function(user, done) {
    done(null, user.email);
});
    
passport.deserializeUser(function(id, done) {
    Employee.findOne(id, function (err, user) {
        done(err, user);
    });
});










passport.use(new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
    function(email, password, done) {


        console.log("got email "+email + " got pw "+password)

        Employee.findOne({ email: email }, function (err, user) {

            console.log("user" +user);
            
            if (err)  return done(err);
            if (!user) return done(null, false); 
            if (user.password !=password)  return done(null, false);
            
            
            console.log("password match")
            return done(null, user);
        });
    }
));



module.exports = passport;
