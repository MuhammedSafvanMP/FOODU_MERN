import stripe from "stripe";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import Orders from "../models/orders.js";
import Cart from "../models/cart.js";
import Products from "../models/productsModel.js";
const stripeInstance = stripe(process.env.STRIPE_SECURITY_KEY);

// user payment

let Svalue = {};

export const payment = async (req, res ) => {

    const userId = req.params.id;
    const user = await User.findById(userId).populate({
      path: "cart",
      populate: { path: "products" },
    });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const cartProducts = user.cart;

    if (cartProducts.length === 0) {
      return res.status(200).json({ status: "error", message: "User cart is empty" });
    }


    let totalAmount = 0;
    let totalQuantity = 0;

    const lineItems = cartProducts.map((item) => {
      totalAmount += item.products.price * item.products.quantity;
      totalQuantity += item.quantity;

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.products.title,
            description: item.products.description,
          },
          unit_amount: Math.round(item.products.price * 100),
        },
        quantity: item.quantity,
      };


    });

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3029/payment/success", // Replace with actual success URL
      cancel_url: "http://localhost:5173/addcart", // Replace with actual cancel URL
    });

    if (!session) {
      return res
        .status(500)
        .json({ status: "error", message: "Error occurred while creating session" });
    }

    Svalue = {
      userId,
      user,
      session,
    };

    //  await Cart.findByIdAndDelete(user.cart._id)    

    res.status(200).json({
      status: "Ok",
      message: "Stripe payment session created successfully",
      url: session.url,
      totalAmount,
      totalQuantity,
    });
};


// payment success


export const success = async (req, res) => {
  
    const { userId, user, session } = Svalue;

    const cartItems = user.cart;

    var quantitys = []
  
    for (const cartItem of cartItems) {
      const productId = cartItem.products;
      const quantity = cartItem.quantity;
       quantitys.push(quantity)

      // Find the product by its ID
      const product = await Products.findById(productId);

      // Check if the product exists
      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }

      // Update the product's current stock
      product.stock -= quantity;

      // Save the updated product
      await product.save();
    }

    // Create an order
    const productIds = cartItems.map((item) => item.products);

    const order = await Orders.create({
      users: userId,
      products: productIds,
      order: session.id,
      payment: `demo ${Date.now()}`,
      totalPrice: session.amount_total / 100,
      quantity: quantitys
    });


    const orderId = order._id;

    // Update the user
    const userUpdate = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { orders: orderId },
        $set: { cart: [] },
      },
      { new: true }
    );

    // Check if user update is successful
    if (!userUpdate) {
      return res.status(500).json({ status: "error", message: "Failed to update user data" });
    }

    // Remove all items from the user's cart after successful payment
    await Cart.deleteMany({ _id: { $in: cartItems.map((item) => item._id) } });

    // Send success response
    res.status(200).json({ status: "Ok", message: "Payment successful" });
};





//Order Details


export const OrderDetails = async (req, res) => {

    const userId = req.params.id;

        const user = await User.findById(userId).populate({
            path: 'orders',
            populate: { path: 'products' }
        });

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        res.status(200).json({  status: "Ok", message: "User order found", data: user.orders });
};


