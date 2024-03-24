const express = require('express')
const app = express()
const connectWithDb =require('./config/database')
const port = 8000; 
const bodyParser = require("body-parser")

//inbuilt middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//all logic/ controllers
const { register, login, updateUser, deleteUser, userById, resetPassword } = require("./controllers/auth/auth");
const { addProduct, updateProduct, deleteProduct, getAllProducts } = require("./controllers/products/products")
const { checkout, addToCart, cart, removeFromCart } = require("./controllers/user/cart")
const { isAdmin, checkAuth } = require("./controllers/middlewares/auth");
const { dashboardData, getAllUsers } = require('./controllers/admin/dashboard');
const { getAllOrders, changeStatusOfOrder } = require('./controllers/admin/orders');
const { orders } = require('./controllers/user/orders');
const { addCategory, getCategory, updateCategory, deleteCategory } = require('./controllers/categories/category');
const { addToWishlist, wishlist, removeFromWishlist } = require('./controllers/user/wishlist');


app.get('/', (req, res) => {
  res.send('server zinda hain')
});


// AUTH
app.post('/register', register);
app.post("/login", login)

//user
app.post("/update-user", updateUser)
app.get("/user", userById)
app.get("/delete-user", deleteUser)
app.post("/reset-password", resetPassword)

// Products
app.post("/product", [isAdmin], addProduct)
app.get("/products", getAllProducts)
app.post("/update-product", [isAdmin], updateProduct)
app.get("/delete-product", [isAdmin], deleteProduct)


// CATEGORIES
app.post("/category", [isAdmin], addCategory)
app.get("/categories", getCategory)
app.post("/update-category", [isAdmin], updateCategory)
app.get("/delete-category", [isAdmin], deleteCategory)


// WISHLIST
app.post("/add-to-wishlist",[checkAuth],addToWishlist)
app.get("/wishlist",[checkAuth],wishlist)
app.get("/remove-from-wishlist",[checkAuth],removeFromWishlist)

// ADMIN
app.get("/dashboard",[isAdmin],dashboardData)
app.get("/admin/orders",[isAdmin],getAllOrders)
app.get("/admin/order-status",[isAdmin],changeStatusOfOrder)
app.get("/admin/users",[isAdmin],getAllUsers)

// ORDERS
app.get("/orders",[checkAuth],orders)


// CHECKOUT
app.post("/checkout",[checkAuth],checkout)
app.post('/cart/add', addToCart);
app.get('/cart', cart);
app.delete('/cart/remove/:productId', removeFromCart);

// HELPER
// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {  
 

//   try{
//     let files = req.files;
//     if(!files.length){
//       return res.status(400).json({ err:'Please upload an image', msg:'Please upload an image' })
//     }
//     let file = req.files[0]
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//         return res.json({"image" : file.filename}) 
//     }
//   }
//   catch(error){
//     return res.send(error.message)
//   }
// })


//connect with db
connectWithDb()

app.listen(port,()=>{
    console.log('server is running at '+port)
})