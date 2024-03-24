const categoryModel = require("../../models/category")

module.exports.addCategory = async(req,res)=>{
    try {
        const {title, description, image} = req.body;

        if(!title || !description) return res.send("Fields are empty")

        let category = new categoryModel(req.body)
        category.save()

        return res.json({
            success : true,
            message : "category inserted successfully",
            data : category
        })
        
    } catch (error) {
        return res.send(error.message) 
    }
}

module.exports.getCategory = async(req,res)=>{
    try {
            const categories = await categoryModel.find()
            const categoriesCount = await categoryModel.find().count()

    return res.json({
        success: true,
        status:200,
        message: "list of all categories",
        categories,
        data: categoriesCount
    })
    } catch (error) {
        res.send(error.message)
    }
}

module.exports.updateCategory = async(req,res)=>{
    try {
        const {title, description, image} = req.body;
        const {id} = req.query;

        // check if product exist with the given product id
        const category = categoryModel.findOne({_id : id})
        if(category){
            const updateCategory = category.findOneAndUpdate({_id : id}, req.body, {new :true})

            res.json({
                success: ture,
                status: 200,
                message: "category updated successfully"
            })
        }
        else{
            res.json({
                success: false,
                status: 400,
                message: "category does not exist"
            })
        }

    } catch (error) {
        res.send(error.message)
    }
}

module.exports.deleteCategory = async (req, res) => {
    try{

        const {id} = req.query;
        
        // check if product exist with the given product id
        const category = await categoryModel.findOneAndDelete({_id : id})
        if(!category){
            return res.json({
                success : false,
                message : "category does not exist",
            })
        }
        return res.json({
            success : true,
            message : "category deleted successfully",
        })

    }catch(error){
        return res.send(error.message)
    } 
}