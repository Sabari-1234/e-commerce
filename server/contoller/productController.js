const Product = require("../models/productModel")

//create product
exports.newProduct=async(req,res)=>{
    try{
        
        const product=await Product.create(req.body)
        res.status(200).send(product)

    }
    catch(err){
        res.status(400).send(err.message)
    }
}

//get products based on search filter and pagination
exports.getProducts=async(req,res)=>{
    try{
        
        const filter={}
        const {minPrice,maxPrice,category,name,page}=req.query
        if(minPrice && !isNaN(minPrice)){
            filter.price={$gte:parseFloat(minPrice)}
        }
        if(maxPrice && !isNaN(maxPrice)){
            filter.price={...filter.price,$lte:parseFloat(maxPrice)}
        }
        if(category){
            filter.category=category
        }
        if(name){
            filter.name={$regex:name,$options:'i'}
        }
        const pageNo = parseInt(page) || 1
        const limit=2
        const skip=limit*(pageNo-1)
        const product=await Product.find(filter).limit(limit).skip(skip)
        res.status(200).send(product)

    }
    catch(err){
        res.status(400).send(err.message)
    }
}

//get single product by id
exports.getSingeProducts=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id)
        res.status(200).send(product)

    }
    catch(err){
        res.status(400).send(err.message)
    }
}

//delete single product by id
exports.deleteProducts=async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id)
        res.status(200).send(product)

    }
    catch(err){
        res.status(400).send(err.message)
    }
}

//update product by id
exports.updateProducts=async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValitators:true
        })
        res.status(200).send(product)

    }
    catch(err){
        res.status(400).send(err.message)
    }
}


//review routes

//create review

exports.createReview=async(req,res)=>{
try{
    const {productId,rating,comment}=req.body
    const newReview={
        user:req.user.id,
        rating,
        comment
    }
    const product=await Product.findById(productId)
    
    const isReviewed=product.reviews.find(review=>{
        return review.user==req.user.id
    })

    if(isReviewed){
        product.reviews.forEach(review=>{
          
            if(review.user==req.user.id){
                review.rating=rating
                review.comment=comment
            }})
    }
    else{
        product.reviews.push(newReview)
    }
    product.numOfReviews=product.reviews.length
    product.ratings=product.reviews.reduce((acc,review)=>{
        return review.rating+acc
    },0)/product.numOfReviews

    product.ratings=isNaN(product.ratings)?0:product.ratings
    await product.save({validateBeforeSave:false})
    res.status(200).send(product)
}
catch(err){
    res.status(400).send(err)
}
}

//get review 

exports.getReviews=async(req,res)=>{
    try{
        const product=await Product.findById(req.query.productId)
        console.log(product)
        res.status(200).send(product.reviews)
    }
    catch(err){
    
        res.status(400).send(err)
    }
}

//delete review

exports.deleteReview=async(req,res)=>{
    try{
        
        const product=await Product.findById(req.query.productId)
        if(!product){
            return res.status(400).send('product not found')
    
        }
        const reviews=product.reviews.filter(review=>{
            return review.id!== req.query.reviewId
        })
        product.reviews=reviews
        product.numOfReviews=reviews.length
        product.ratings=product.reviews.reduce((acc,review)=>{
            return acc+review.rating
        },0)/ product.numOfReviews
        product.ratings=isNaN(product.ratings)?0:product.ratings
        await product.save({validateBeforeSave:false})
        res.status(200).send(product)
    

    }
    catch(err){
        res.status(400).send(err)

    }
}

