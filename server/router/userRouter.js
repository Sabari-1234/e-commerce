
//imports:
//import express
const express=require('express')
//create router 
const router=express.Router()
//importing passport local file
require('../utils/passport-local')
//import passport module
const passport = require('passport')
//importing  functions from user controller
const {register,protected, logout, forgetPassword, resetPassword, getProfile, updateProfile, updatePassword, getAllUser, getSingleUser, updateUser, deleteUser } = require('../contoller/userController')

const {authenticate, authorized}=require('../middlewares/auth')


//routes:
//router for registration
router.route('/register').post(register)
//route for login
router.route('/login').post(passport.authenticate('local', { successMessage:'success',failureMessage:'failure' }));
//route for protected
router.route('/protected').get(protected)
//route for logout
router.route('/logout').get(authenticate,logout)
//route for forget password
router.route('/forgetPassword').post(authenticate,forgetPassword)
//router for reset password
router.route('/resetPassword').put(authenticate,resetPassword)

//get user profile

router.route('/Profile').get(authenticate,getProfile)
                        .put(authenticate,updateProfile)
router.route('/passwordUpdate').put(authenticate,updatePassword)

//admin routes

router.route('/admin/profiles').get(authenticate,authorized,getAllUser)
router.route('/admin/profiles/:id').get(authenticate,authorized,getSingleUser)
                                    .put(authenticate,authorized,updateUser)
                                    .delete(authenticate,authorized,deleteUser)





//export:
module.exports=router