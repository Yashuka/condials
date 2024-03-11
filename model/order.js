const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  user : {
    type : String,
    ref : 'user',
   required : true
  },
  orderitem : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'orderitem' ,
    required : true
  },
shippingAddress1 : {
   type : String,
  required : true
},
shippingAddress2 : {
   type : String,
   required : true
},
city : {
    type : String,
    required : true
}

})
const Order = mongoose.model("Order",orderSchema)
module.exports = Order;