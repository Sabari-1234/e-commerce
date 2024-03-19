const express=require('express')
const { authenticate, authorized } = require('../middlewares/auth')
const { getSingleOrder, createOrder, getMyOrder, getAllOrder, deleteOrder, updateOrder } = require('../contoller/orderController')
const router=express.Router()

//routes for normal users
router.route('/order/create').post(authenticate,createOrder)
router.route('/order/:id').get(authenticate,getSingleOrder)
router.route('/orders').get(authenticate,getMyOrder)

//admin route
router.route('/admin/orders').get(authenticate,authorized,getAllOrder)
router.route('/admin/order/:id').delete(authenticate,authorized,deleteOrder)
                                .put(authenticate,authorized,updateOrder)

module.exports=router