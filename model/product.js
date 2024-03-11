const mongoose = require('mongoose')
const multer = require('multer')
//const path = require('path')
//const product_path = path.join('/uploads')

const productSchema = new mongoose.Schema({
     user :{
     type :String,
     ref :'user'
     },
    
    productName : {
        type : String
    },
    brand : {
        type : String
    },
    productImage : {
        type : String
    },
    price: {
        type : Number,
        default : 0
    },
   CountInStock : {
    type : Number,
    //required : true,
    min : 0,
    max : 255
   },
   category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Category'
   }
   
})
 





const Product = mongoose.model('product',productSchema)
module.exports = Product;

