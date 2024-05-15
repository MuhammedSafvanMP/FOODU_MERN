import Products from "../models/productsModel.js";

// Show all products
export const allProducts = async (req, res) => {
    
    const allProducts = await Products.find();
    if (!allProducts) {
        return res.status(404).json({ status: "error", message: "Unable to get products" });
    }
    return res.status(200).json({ status: "Ok", message: "Find all products", data: allProducts });
};

// Show product by ID
export const productGetId = async (req, res) => {
    const { id } = req.params;
    const findProduct = await Products.findById(id);
    if (!findProduct) {
        return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "Ok", message: "Product found", data: findProduct });
};

// Show products by category
export const userProductByCategory = async (req, res) => {
    const { categoryname } = req.params;
    const products = await Products.find({
        $or: [
            { category: { $regex: new RegExp(categoryname, 'i') } },
            { title: { $regex: new RegExp(categoryname, 'i') } },
        ]
    }).select('title category price productImg');
    
    if (products.length === 0) {
        return res.status(404).json({ status: "error", message: "No items found in the given category" });
    }
    
    res.status(200).json({ status: "Ok", message: "Product found", data: products });
};
