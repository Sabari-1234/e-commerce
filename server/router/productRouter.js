const express=require('express')
const { getProducts, newProduct, getSingeProducts, deleteProducts, updateProducts, createReview, getReviews, deleteReview } = require('../contoller/productController')
const { authenticate, authorized } = require('../middlewares/auth')

//router set up
const router= express.Router()



//route for product 
//get and create routes
router.route('/product')
                        .get(authenticate,getProducts)
                        .post(authenticate,authorized,newProduct)
//delete,get,update by id routes
router.route('/product/:id')
                            .get(authenticate,authorized,getSingeProducts)
                            .delete(authenticate,authorized,deleteProducts)
                            .put(authenticate,authorized,updateProducts)
router.route('/review')
                            .post(authenticate,createReview)
router.route('/reviews')
                            .get(getReviews)
                            .delete(authenticate,authorized,deleteReview)
    

                           

module.exports=router
