const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
// const bcrypt=require('bcrypt');
const Employee  = require('../models/Employee');
const LabEmployee = require('../models/LabEmployee')

passport.serializeUser(function(user, done) {
    done(null, user.email);
});
    
passport.deserializeUser(function(email, done) {
    Employee.findOne({email:email}, function (err, user) {
        done(err, user);
    });
});










passport.use(new LocalStrategy(
    {usernameField:"email", passwordField:"password"},
    async function(email, password, done) {


        console.log("got email "+email + " got pw "+password)

        let user = await Employee.findOne({ email: email });


        if(user){
            if(user.password != password) return done(null,false);

            console.log("password match for employee")
            return done(null,user);
        }

        else{
            let user = await LabEmployee.findOne({email:email});

            if(user){
                if(user.password != password) return done(null,false);
    
                console.log("password match for lab employee")
                return done(null,user);
            }


        }
    }
));



module.exports = passport;
