const User = require('../model/user')
const Product = require('../model/product')
const multer = require('multer')
const jwt = require("jsonwebtoken")
const randomString = require('randomstring')
const nodemailer = require('nodemailer')
const env = require('../config/env')
const Order = require('../model/order')
const Category = require('../model/category')
const Orderitem = require('../model/orderitem')


const resetEmail = async (email, randomToken, req) => {
  try {
    let transport = nodemailer.createTransport(env.smtp);

    let info = await transport.sendMail({
      from: "yashirathore324@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<p>Click here for reset password <a href="http://localhost:7000/api/forgotpassword?token=${randomToken}">Reset Password</a></p>`
    });
    console.log("Email Sent ", info.response)
  } catch (error) {
    console.log("error in generating code", error)
  }
}



module.exports.signup = function (req, res) {

  return res.status(200).json({
    message: "SignUp",
    success: true
  })
}


module.exports.signin = function (req, res) {
  return res.status(200).json({
    message: "Successful",
    success: true
  })
}



module.exports.create = async function (req, res) {
  console.log("reqBody", req.body)
  try {
    const user = await User.findOne({email : req.body.email})
    console.log("User",user);
    if(user === null){
      const newUser = await User.create(req.body)
      const token = jwt.sign({ email: req.body.email },env.db , { expiresIn: '1hr' })
      console.log("token",token)
       console.log("newUser",newUser);
       res.status(200).json({
          message : "Signup Successfully", 
          success : true
       })
    }else {
      res.status(401).json({
        message : 'User Already Exists!!!!'
      })
    }
  } catch (error) {
    res.status(500).json({
      message : "Internal Error"
    })
  }
 
}


module.exports.createSession = async function (req, res) {

  // steps to authenticate
  // find the user

  /*const user =await User.findOne({email: req.body.email})
   console.log("user", user);
 
   // function(err, user){
   //     if(err){console.log('error in finding user in signing in'); return}
       // handle user found
       if (user){
         console.log("11111")
         console.log("user.password", user.password )
         console.log("user.password", req.body.password)
           // handle password which doesn't match
           if (user.password != req.body.password){
               return res.redirect('back');
           }
 
           // handle session creation
           
        return res.status(401).json({
         message : "Error"
        })
 
       }else{
           // handle user not found
              
           return res.status(200).json({
             message : "Signup Successfully"
           })
       }
       */

  res.status(200).json({
    message: "Signin successfully",
    success: true
  })

};

module.exports.forgotPassword = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email })
    console.log("userData", userData)
    if (userData) {
      const randomToken = randomString.generate()
      console.log("randomString", randomToken)
      const data = await User.updateOne({ email: req.body.email }, { $set: { token: randomToken } })
      resetEmail(userData.email, randomString)
      console.log("data", data)
      const token = jwt.sign({ email: req.body.email },env.db, { expiresIn: '1hr' })
     
      console.log("token", token)
      return res.status(200).json({
        message: "token generated successfully",
        success: true
      })
    }
  } catch (error) {
    console.log("error in generating token")
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

module.exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.randomToken
    const user = await User.findOne({ randomToken: token })
    console.log("user", user)
    if (user) {
      const newPassword = req.body.password;
      console.log("newPassword", newPassword);
      const passwordUpdate = await User.findByIdAndUpdate(user._id, {
        password: newPassword,
        randomToken: ''
      }, { new: true })
      console.log("updatepassword", passwordUpdate)
    }
    return res.status(200).json({
      message: "New Password generated",
      success: true
    })
  }

  catch (error) {
    return res.status(500).json({
      message: "Internal Error"
    })
  }
}

module.exports.products = function (req, res) {
  res.status(200).json({
    "message": "get product",
    "success": true
  })
}

module.exports.product = async function (req, res) {
  console.log("req.body", req.body);
  const user = await User.findOne({email : req.body.user})
  console.log("user",user)
  if(!user){
  res.status(401).json({message : "Invalid User"})
  } 
const category = await Category.findById(req.body.category)
   console.log("category",category)
if(!category){
  res.status(401).json({message : "Invalid category"})
}
const checkproduct = await Product.findOne({productName : req.body.productName})
console.log("checkproduct",checkproduct)
if(  checkproduct === null ){
  const product = await Product.create({
    user : user,
    productName: req.body.productName,
    brand: req.body.brand,
    productImage: req.body.productImage,
    price: req.body.price,
    CountInStock : req.body.CountInStock,
    category : req.body.category
  })
  console.log("product", product)
  return res.status(200).json({
    message: "Product Created Successfully !!!",
    data : product
  })
}else {
  res.status(401).json({
    message: "Product Already Exists"
  })
}}

module.exports.getAllProduct = async(req,res)=>{
  try {
   const productList = await Product.find()
  console.log("productList",productList);
  if(!productList){
   res.status(401).json({
     message : "not found",
     success : false
   })
  }
    res.status(200).json({
     message : "get all product",
     success : true
    })
  } catch (error) {
      res.status(401).json({
       message : "failed",
       success : false
      })
  }
   
 }

module.exports.updateProduct = async function (req, res) {
  const id = req.params.id;
  console.log("id", req.file);

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        productName: req.body.productName,
        brand  : req.body.brand ,
        productImage: req.file.originalname, 
        price: req.body.price,
        CountInStock : req.body.CountInStock,
        category : req.body.category
      },
      { new: true }
    );

    console.log("Product", product);


    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product updated", product });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



module.exports.destroyProduct = async function (req, res) {
  const id = req.params.id
  console.log("id", id)
  try {
    const product = await Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // Correct usage of res.status() with res.json()
    }

    return res.status(200).json({ message: "Product Deleted", product });

  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }

}

module.exports.category = async(req,res)=>{
  try {
    res.status(200).json({
      message : "Category",
      success : true
    })                                             
  } catch (error) {
    res.status(500).json({
      message : "Internal Server Error",
      success : false
    })                                             
  }
}

module.exports.createCategory = async(req,res)=>{
  try {

    console.log(req.body)
   const product = await Product.findById(req.body.product)
     console.log("product",product)
   const category = await Category.create({
      name : req.body.name,
      description : req.body.description,
      imageUrl :  req.body.imageUrl,
      product: req.body.product,
      createdAt: req.body.createdAt
    },
    { new: true })
    console.log("category",category)
   
    
    res.status(200).json({
      message : "successful",
      success : true
    })
  } catch (error) {
    res.status(500).json({
      message : "Internal Error",
      success : false
    })
  }
};
module.exports.getorderItem = (req,res)=>{
  try {
    res.status(200).json({
      message : "orderitem",
      success : true
    })
  } catch (error) {
    res.status(401).json({
      message : "Error",
      success : false
    })
  }
}
module.exports.orderItem = async(req,res)=>{
  try {
    console.log("reqbody",req.body)
    const user = await User.findOne({email : req.body.user})
    if(!user){
    return res.status(401).json({message : "user not found"})
    }
      console.log("user",user)
    const product = await Product.findById(req.body.product)
    console.log("product",product)
    const orderitem = await Orderitem.create({
      user : user.email,
      quantity : req.body.quantity,
      product : req.body.product,
      totalPrice : req.body.totalPrice,
      dateordered : req.body.dateordered
    },
    { new: true })
    console.log("orderitem",orderitem)

    if(!orderitem){
      res.status(401).json({
        message : "Error",
        success : false
      })
    }
    res.status(200).json({
      message : "Orderitem fetched",
      success : true
    })
    
  } catch (error) {
    res.status(500).json({
      message : "Internal Error",
      success : false
    })
  }
}

module.exports.getorder = (req,res)=>{
 try {
  res.status(200).json({
    message : "Get order",
    success : true
  })
 } catch (error) {
  res.status(401).json({
    message : "Error"
  })
 }
}

module.exports.ordercreate = async (req, res) => {
  try {
      console.log("reqbody", req.body);

      const user = await User.findOne({email: req.body.user});
      console.log("user", user.email);

      if (!user) {
          return res.status(404).json({
              message: "User not found",
              success: false
          });
      }

      const item = await Orderitem.findById(req.body.orderitem);
      console.log("orderitem", item);
    
      const newOrder = await Order.create({
        user: user.email, 
        orderitem: req.body.orderitem,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city
    });
    console.log("newOrder", newOrder);
    res.status(200).json({
        message: "Order placed",
        success: true
    });
      
  } catch (error) {
      console.log("error", error);
      res.status(401).json({
          message: "Error creating order",
          success: false
      });
  }
};


module.exports.allorder = async(req,res)=>{
  try {
    const orderList = await Order.find()
    console.log("orderList",orderList)
    if(!orderList){
      res.status(401).json({
        message : "Not Found"
       })
    }else{
      res.status(200).json({
        message : "Orderlist fetch!!!",
        success : true
       })
    }
  } catch (error) {
    res.status(500).json({
     message : "Internal Server Error"
    })
  }
}

module.exports.destroySession = function (req, res) {
  req.logout()
  return res.status(200).json({
    message: "logout"
  })
}
