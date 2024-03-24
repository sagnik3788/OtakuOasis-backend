const orderModel = require('../../models/order')
const userModel = require('../../models/user')
const productModel = require('../../models/product')
const {objectId} = require('mongodb')

module.exports.checkout = async(req,res) =>{
    try {
        const user = req.user
        var body = req.body

        body.user = user?._id
        body.orderId = (Math.floor(Math.random() * 1000000000)).toString();

        //if the cart is empty
        if(body?.items.length){
            let checkout = new orderModel(body)
            checkout.save()

            let items = body?.items
    
            items.forEach(async item=>{
                const updatedProduct  = await productModel.findOneAndUpdate(
                    { _id: item.productId },
                        [{
                            $set: {
                                quantity: {
                                    $subtract: ["$quantity", item.quantity]
                                },
                            }
                        }],
                )
            })
            return res.json({
                success: true,
                message : "successful checkout",
                data : checkout
            })
        }
        else{
            return res.json({
                success: flase,
                message : "pass correct parameter",
            })
        }
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports.addToCart = async (req, res) => {
    try{

        const data = req.body
        let user = req.user

        const addToCart = await userModel.findOneAndUpdate({_id : user?._id}, { $push: { cart: data } },{new : true})

        return res.json({
            success : true,
            message : "product pushed in cart successfully",
            data : addToCart
        })

    }catch(error){
        return res.send(error.message)
    }
}

module.exports.removeFromCart = async(req,res)=>{
    try {
        const id = req.query     
        let user = req.user
        const removeFromCart = await userModel.findOneAndUpdate({_id : user?._id}, { $pull: { cart: {productId : ObjectId(id)} } },{new : true})

        return res.json({
            success: true,
            message : "product  remove from cart successfully",
            data : removeFromCart
        })

    } catch (error) {
         return res.send(error.message)
    }
}

module.exports.cart = async (req, res) => {
    try{
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }
        const user = req.user

        const cart = await userModel.find({_id : user._id})
            .populate("cart.productId")
            .select("-password -userType")

        return res.json({
            success : true,
            message : "cart",
            data : cart
        })

    }catch(error){
        return res.send(error.message)
    }
}