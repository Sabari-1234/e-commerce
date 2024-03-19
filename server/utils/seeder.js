
const products=require('../data/product.json')
require('dotenv').config({path:'../.env'})
require('../config/dbConnection')
const Product=require('../models/productModel')




const seeder=async()=>{
    try{
        await Product.deleteMany()
        console.log('all item deleted success fully')
        await Product.insertMany(products)
        console.log('all item inserted success fully')
    }

    catch(err){
        console.log(err.message)
    }
    process.exit()

}

seeder()
