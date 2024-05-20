import Orders from "../models/orders.js";
import User from "../models/userModel.js";

// admin order Details

export const adminOrderDetails = async (req, res) => {
  const orders = await Orders.find();
  if (orders.length === 0) {
    return res
      .status(404)
      .json({ status: "error", message: "No order Details" });
  }
  res.status(200).json({ status: "Ok", message: "Order found", data: orders });
};

// shipped

export const shipped = async (req, res) => {

    const  orderId  = req.params.id;

    // Find the order by ID and update its status
    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }
    order.orderStatus = "Shipped";
    await order.save();

    res.status(200).json({ status: "Ok", message: "Orders shipped successfully" });
};

// on the way

export const OntheWay = async (req, res) => {
 
  const  orderId  = req.params.id;

  // Find the order by ID and update its status
  const order = await Orders.findById(orderId);
  if (!order) {
    return res.status(404).json({ status: "error", message: "Order not found" });
  }
  order.orderStatus = "On the way";
  await order.save();



  res.status(200).json({ status: "Ok", message: "Orders On the way successfully" });


};

// delivered

export const Delivered = async (req, res) => {

    const  orderId  = req.params.id;

    // Find the order by ID and update its status
    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }
    order.orderStatus = "Delivered";
    await order.save();

    res.status(200).json({ status: "Ok", message: "Order Delivered successfully" });
 
};

//Total Revenue Generated

export const status = async (req, res) => {
  const totalStats = await Orders.aggregate([
    {
      $group: {
        _id: null,
        totalProduct: { $sum: { $size: "$products" } },
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const user = await User.find().populate({
    path: "orders",
    populate: { path: "products" },
  });

  if (!user) {
    return res.status(404).json({ status: "error", message: "No users found" });
  }

  if (totalStats.length > 0)
    res
      .status(200)
      .json({
        status: "Ok",
        data: totalStats[0],
        alluser: { user: user, userOrder: user.orders },
      });
  else
    res
      .status(200)
      .json({
        status: "error",
        message: "NO total",
        data: { totalProduct: 0, totalRevenue: 0 },
      });
};
