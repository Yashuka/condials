const mongoose = require('mongoose')

const orderitemSchema = mongoose.Schema({
 quantity : {
    type : Number,
    required : true
 },
 product : {
   type: mongoose.Schema.Types.ObjectId,
   ref : 'product'
},

totalPrice : {
  type : Number
},
user: {
    type : String,
     ref : 'user',
    required : true 
},
dateordered : {
   type : Number,
   default : Date.now,
}
})
const Orderitem = mongoose.model("Orderitem",orderitemSchema);
module.exports = Orderitem;