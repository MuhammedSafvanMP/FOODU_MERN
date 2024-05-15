import Orders from "../models/orders.js"
import User from "../models/userModel.js";



// admin order Details 

export const adminOrderDetails = async (req, res) => {

        const orders = await Orders.find();
        if(orders.length === 0) {
            return res.status(404).json({status: "error", message: "No order Details"});
        }
        res.status(200).json({status: "Ok" , message: "Order found", data: orders});
  
}


//Total Revenue Generated

export const status = async (req, res ) => {

    const totalStats = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalProduct: { $sum: { $size: "$productId" } }, 
          totalRevenue: { $sum: "$totalPrice" }
        }
      }
    ]);

  

    const user = await User.find().populate({
      path: 'orders',
      populate: { path: 'productId' }
  });

  if (!user) {
    return res.status(404).json({status: "error", message: "No users found" });
  }

    if (totalStats.length > 0) 
      res.status(200).json({ status: "Ok", data: totalStats[0] , alluser: {"user": user, "userOrder": user.orders} });
     else 
      res.status(200).json({ status:"error", message: "NO total",   data :  { totalProduct: 0, totalRevenue: 0} });
    
};

