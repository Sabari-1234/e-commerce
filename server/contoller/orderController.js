const Order=require('../models/orderModel')
const Product=require('../models/productModel')

//create order

exports.createOrder=async(req,res)=>{
try{
    const order=await Order.create({...req.body,user:req.user.id,paidAt:Date.now()})
    res.status(200).send(order)
}
catch(err){
    res.status(400).send(err)
}
}


//get single order

exports.getSingleOrder=async (req,res)=>{
    try{
        const order=await Order.find({id:req.params.id,user:req.user.id}).populate('user','name email')
        
        if(order.length==0){
            return  res.status(400).send('order not found')
        }
        res.status(200).send(order)

    }
    catch(err){
        res.status(400).send(err)
    }
}


//get logged users order
exports.getMyOrder=async(req,res)=>{
    try{
        const order=await Order.find({user:req.user.id})
        res.status(200).send(order)

    }
    catch(err){
        res.status(400).send(err)
    }
}

//for admin 


//get all orders of all user 

exports.getAllOrder=async(req,res)=>{
    try{
        const order=await Order.find()
        res.status(200).send(order)

    }
    catch(err){
        res.status(400).send(err)
    }
}


//delete order
exports.deleteOrder=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(!order){
            return res.status(200).send('order not found')
        }
       const deletedOrder=await Order.findByIdAndDelete(req.params.id)
        res.status(200).send(deletedOrder)

    }
    catch(err){
        res.status(400).send(err)
    }
}


//update order status in order collection and stock in product collection

exports.updateOrder=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(!order){
            return res.status(400).send('order not found')
        }
       if(order.orderStatus==='delivered'){
            return res.status(400).send('order already delivered')
       }
      
       order.orderItems.forEach(item=>updateStock(item.product,item.quantity))
      
        order.orderStatus='delivered'
        order.deliveredAt=Date.now()
        await order.save()
        res.status(200).send(order)

       
       
       
    }
    catch(err){
        res.status(400).send(err)
    }
}

const updateStock=async(productId,quantity)=>{
   
    const product=await Product.findById(productId)
    product.stock-=quantity
    await product.save()}