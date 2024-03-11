const mongoose = require('mongoose')

  
    const categorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        product: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });
    
 
    
    
 
 const Category = mongoose.model("category", categorySchema );
 module.exports = Category;