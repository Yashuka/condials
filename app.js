const express=require('express')
const app=express()
const env = require('./config/env')
app.use(express.urlencoded({extended: false}))
const session = require('express-session');
const passport = require('passport');
const localPassport = require('./config/passport-local-strategy')
const jwtPassport = require('./config/passport-pwt-strategy')
const cookieParser = require('cookie-parser')
// const public = require('../Public/upload')
const port = 7000
app.use(express.json());
const expressLayouts = require('express-ejs-layouts')
 const db = require('./config/mongoose')

app.use(express.static('Public/upload'))

 app.use(session({
    secret : env.session_cookies_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
 }))
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuthenticationUser)

 app.use(cookieParser())
app.use(express.static('./assets'))
app.use(expressLayouts)
app.set('layout extractStyles', true)
app.set('layout extractScripts',true)
app.use('/api',require('./routes'))

app.set('view engine','ejs');
app.set('views','./views')



app.listen(port,function(err){
    if(err){
       console.log(`Error in running server : ${err}`)
       
    }
    console.log(`Server is Running on Port : ${port}`)
})

