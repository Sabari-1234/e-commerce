//imports:
//import express
const express=require('express')
//create app
const app=express()
//import dotenv
require('dotenv').config()
//import mongo db connection
require('./config/dbConnection')
//import passport 
const passport = require('passport')
//importing express session
const session=require('express-session')
//importing connect mongo
const MongoStore=require('connect-mongo')


//importing routers:
//router for productRouter
const productRouter=require('./router/productRouter')
//router for userRouter
const userRouter=require('./router/userRouter')

//router for orderRouter

const orderRouter=require('./router/orderRouter')

//import middlewares
//for sending json data
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//session middleware
app.use(session({
    secret: process.env.COOKIE_SECRETE,
  
    resave: false,
    saveUninitialized: true,
    store:MongoStore.create({mongoUrl:process.env.MONGO_URI,collectionName:'sessions'}),
    cookie: { maxAge:24*60*60*1000 }
  }))
 //middleware for initialize passport 
app.use(passport.initialize())
//middleware for session in passport
app.use(passport.session())

//middleware for routers:
//middleware for product router
app.use('/api/v1',productRouter)
//middleware for user router
app.use('/api/v1',userRouter)

//middleware for order router

app.use('/api/v1',orderRouter)


//run server
app.listen(process.env.PORT,()=>{
    console.log(`server runs${process.env.PORT}`)
})