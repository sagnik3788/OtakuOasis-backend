const mongoose = require('mongoose')


const userSchema = new  mongoose.Schema({
    name: String,
    email : {type : String, required : true, unique : true},
    userType : String,
    password : String,
    token: String,
    wishlist: [{productId : {type: mongoose.Schema.Types.ObjectId, ref : "product"}, quantity : Number}]
},{timestamps: true})

module.exports = mongoose.model('user',userSchema)