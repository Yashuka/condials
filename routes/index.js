const express=require('express')
const router=express.Router()
const passport = require('passport');
const productController = require('../controller/product_controller');
const multer = require('multer');

console.log("Product is loaded")
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./Public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
  });
  
  let upload = multer({
    storage : storage,
    limits : {files : 1024*1024*1024}
  })




router.get('/signin',productController.signin)
router.get('/signup',productController.signup)
router.post('/create',productController.create)
router.post('/createsession',passport.authenticate(
 'local',
{failureRedirect : 'res.status(401).json({message : "Error"})'}
),productController.createSession)
router.post('/forgotpassword',productController.forgotPassword)
router.get('/resetpassword',productController.resetPassword)
router.get('/logout',productController.destroySession)
router.post('/add/product',upload.single('productImage'), productController.product)
router.get('/Product',productController.products)
router.post('/updateProduct/:id', productController.updateProduct)
router.post('/destroy/:id',productController.destroyProduct)
router.get('/allproduct',productController.getAllProduct)
router.get('/category',productController.category)
router.post('/createcategory',productController.createCategory)
router.get('/orderitem',productController.getorderItem)
router.post('/orderitemcreate',productController.orderItem)
router.get('/order',productController.getorder)
router.post('/ordercreate',productController.ordercreate)
router.get('/allorder',productController.allorder)
router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email ']}))
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect : 'res.status(401).json({message : "Error"})'}))



module.exports=router;