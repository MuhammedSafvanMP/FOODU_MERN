import Products from "../models/productsModel.js";
import productJoi from "../validation/productJoi.js";


// create products

export const createProducts = async (req, res, ) => {
    
        // Manual validation (optional but recommended)
        // const { title, description, price, category } = req.body;
        // if (!title || !description || !price || !category) {
        //     return res.status(400).json({ message: "Bad request" });
        // }

        // Validate request body using Joi
        
        const { result, error  }= await productJoi.validateAsync(req.body);
        

        if (error) {
            return res.status(422).json({ message: "Validation Error", data: error.details });
        }

        const newProduct = new Products({
            title: result.title,
            description: result.description,
            price: result.price,
            category: result.category,
            stock: result.stock,
            productImg: req.cloudinaryImageUrl //req.file ? req.file.filename : null,
        });

        await newProduct.save();
        return res.status(201).json({ status: "created",  message: "Product created successfully" });

    
};


// view all products 

export const  adminViewAllProducts = async (req, res) => {
   
        const allProcucts = await Products.find();

        if(!allProcucts){
            return res.status(404).json({ status: "error",  message: "Product not found"});
        }

        res.status(200).json({ status: "Ok", message: "Product found", data: allProcucts});
}


// view product by id 


export const adminViewProductById = async (req, res) => {
 
        const productId  = req.params.id;

        const findProduct = await Products.findById(productId);
        if(!findProduct){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json(findProduct);
   
}


// view product by category 


export const adminProductByCategory = async (req, res ) => {                                                                                            


        const { categoryname } = req.params;
            // Find products by category
            const products = await Products.find({
                $or: [
                    { category: { $regex: new RegExp(categoryname, 'i') } },
                    { title: { $regex: new RegExp(categoryname, 'i') } },
                ]
            }).select('title category price');
            
            if (products.length === 0) {
                return res.status(404).json({   message: "No items found in the given category" });
            }
            
            res.status(200).json({ status: "Ok" ,  message: "Product found",  data:products });
};


// update products
export const adminUpdateProducts = async (req, res) => {
 
        const  productId  = req.params.id;

        const findProduct = await Products.findById(productId);

        if (!findProduct) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }
        const { title, description, price, category, stock } =  req.body;
        
        // Update the product properties if they exist in the request body
        if (title) findProduct.title = title;
        if (description) findProduct.description = description;
        if (price) findProduct.price = price;
        if (req.cloudinaryImageUrl) findProduct.productImg = req.cloudinaryImageUrl;
        if (category) findProduct.category = category;
        if (stock) findProduct.stock = stock;

        // Save the updated product
        await findProduct.save();

        res.status(200).json({ status: "Ok", message: "Product successfully updated" });
};




// delete product

export const adminDeleteProductById = async (req, res) => {
    
        const { productId } = req.params;

        const productDelete = await Products.findByIdAndDelete(productId);

        if (!productDelete) {
            return res.status(404).json({ status: "error",  message: "Product not found" });
        }

        res.status(200).json({ status: "Ok", message: "Product deleted successfully" });
}
