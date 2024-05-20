import User from "../models/userModel.js";
import Cart from "../models/cart.js";
import Products from "../models/productsModel.js";


// Add to cart

export const addToCart = async (req, res) => {   
    
        const userId = req.params.userid;
        const productId = req.params.id;
        // Find user by ID
        const user = await User.findById(userId);
      
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Find product by ID
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        // Check if the product already exists in the cart
        let cartItem = await Cart.findOne({ users: user._id, products: product._id });
        
        if (cartItem) {
            // If the product already exists, increment the quantity
            if(product.stock > 0){

                cartItem.quantity++;
                await cartItem.save();
                return res.status(200).json({ status: "Ok",  message: "Cart product incremented" });
            }
            else res.status(500).json({status: "error",  message: "No stock"})
        } else {
            // If the product doesn't exist, create a new cart item
            if(product.stock > 0){
            cartItem = await Cart.create({
                users: user._id,
                products: product._id,
                quantity: 1
            });
        }
        else res.status(500).json({status: "error", message: "No stock"})
            // Add the cart item to the user's cart
            user.cart.push(cartItem._id);
            await user.save();
            return res.status(200).json({ status: "Ok", message: "Product added to cart successfully" });
        }
};



// view  product from cart    


export const viewCart = async (req, res) => {

        const {id} = req.params; 

        const user = await User.findById(id)
        .populate({
            path: 'cart',
            populate: { path: 'products'}
        });

        if(!user){
            return res.status(404).json({status: "error", message: "User not found"});
        }

        if(!user.cart || user.cart.length === 0){
            return res.status(200).json({ status: "Ok", message: "User cart is empty", data: []});
        }

        res.status(200).json({ status: "OK", message: "User cart find", data: user.cart });
}

// Add cart quantity

export const incrementCartItemQuantity = async (req, res) => {
    
        const userId = req.params.userid;
        const productId = req.params.id;
        // const  {quantityIncrement}  = req.body;  


        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        // Find product by ID
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        // Find or create cart item
        let cartItem = await Cart.findOne({ users: user._id, products: product._id });
        if (cartItem) {
            if(product.stock > 0){

                cartItem.quantity ++;
                await cartItem.save();
            }
          else res.status(500).json({ status: "error", message: "No stock"})

        }

        res.status(201).json({ status: "Ok" , message: "Quantity incremented" });
};


export const decrementCartItemQuantity = async (req, res) => {
   
      const userId = req.params.userid;
      const productId = req.params.id;
  
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find product by ID
      const product = await Products.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Find cart item
      let cartItem = await Cart.findOne({ users: user._id, products: product._id });
      if (cartItem) {
        // If the product already exists, decrement the quantity
        if (cartItem.quantity > 1) {
          if (product.stock < cartItem.quantity) {
            return res.status(400).json({ status: "error", message: `Only ${product.stock} available` });
          }
          cartItem.quantity--;
          await cartItem.save();
        } else {
          cartItem.quantity = 1;
          await cartItem.save();
        }
  
        return res.status(201).json({ status: "Ok", message: "Quantity decremented" });
      } else {
        return res.status(404).json({ message: "Cart item not found" });
      }
  };
  

// cart full quantity

export const cartFullQuantity = async (req, res) => {
        
        const userId = req.params.id;
        const user = await User.findById(userId).populate({
      path: "cart",
      populate: { path: "products" },
    });

    if (!user) {
      return res.status(404).json({  status: "error", message: "User not found" });
    }

    const cartProducts = user.cart;

    if (cartProducts.length === 0) {
      return res.status(200).json({ status: "error", message: "User cart is empty" });
    }

    let totalAmount = 0;
    let totalQuantity = 0;

    // Calculate total amount and quantity
    cartProducts.forEach((item) => {
      totalAmount += item.products.price * item.quantity;
      totalQuantity += item.quantity;
    });

    // Send the total amount and quantity in the response
    return res.status(200).json({  status: "Ok", message: "Total amount found",  totalAmount, totalQuantity });   
};


// Remove A cart 


export const removeCart = async (req, res) => {

        const { userId, itemId } = req.params;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ status: "error", message: "User not found" });
        }

        // Find product by ID
        const product = await Products.findById(itemId);
        if (!product) {
            return res.status(400).json({ status: "error", message: "Product not found" });
        }

        // Find and delete cart item for the specific user and product
        const cartItem = await Cart.findOneAndDelete({ users: user._id, products: product._id });

        if (!cartItem) {
            return res.status(400).json({  status: "error", message: "Product not found in the user's cart" });
        }

        // Find the index of the cart item in the user's cartItems array
        const cartItemIndex = user.cart.findIndex(item => item.equals (cartItem._id));

        // If the cart item is found, remove it from the user's cartItems array
        if (cartItemIndex !== -1) {
            user.cart.splice(cartItemIndex, 1);
            await user.save();
        }

        return res.status(200).json({  status: "Ok", message: "Product removed successfully" });
};


