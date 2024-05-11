import Orders from "../models/orders.js"
import Products from "../models/productsModel.js";
import User from "../models/userModel.js";



// admin order Details 

export const adminOrderDetails = async (req, res, next) => {
    try {
        const orders = await Orders.find();
        if(orders.length === 0) {
            return res.status(404).json({message: "No order Details"});
        }
        res.status(200).json(orders);

    } catch (error) {
       return next(error);   
    }
}


//Total Revenue Generated

export const status = async (req, res, next) => {
  try {
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
      return res.status(404).json({ message: "User not found" });
  }




    if (totalStats.length > 0) 
      res.status(200).json({ status: "Success", data: totalStats[0] , alluser: {"user": user, "userOrder": user.orders} });
     else 
      res.status(200).json({ "sales" : { totalProduct: 0, totalRevenue: 0} });
    
  } catch (error) {
    return next(error);
  }
};


// export const status = async (req, res, next) => {
//   try {
//     // Fetch total statistics
//     const totalStats = await Orders.aggregate([
//       {
//         $group: {
//           _id: null, // Assuming you want results for all documents
//           totalProduct: { $sum: { $size: "$productId" } },
//           totalRevenue: { $sum: "$totalPrice" }
//         }
//       }
//     ]);

//     // Check if total stats retrieval was successful
//     if (!totalStats || !totalStats.length) {
//       // Handle unsuccessful retrieval (log, return defaults, etc.)
//       console.error("Failed to retrieve total statistics");
//       return res.status(200).json({
//         status: "Success", // Consider adjusting status based on actual outcome
//         data: { totalProduct: 0, totalRevenue: 0 }
//       });
//     }

//     // Fetch all products
//     const allProducts = await Products.find();

//     // Fetch user with populated orders (and potentially productId)
//     const user = await User.find().populate({
//       path: 'orders',
//       populate: { path: 'productId' } // Assuming you need productId details
//     });

//     // Handle user not found
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Handle empty user orders
//     if (!user.orders || user.orders.length === 0) {
//       return res.status(200).json({ message: "User order is empty", data: [] });
//     }

//     // Respond with total statistics
//     res.status(200).json({ status: "Success", data: totalStats[0] });
//   } catch (error) {
//     console.error("Error occurred:", error);
//     return next(error); // Pass error to next middleware
//   }
// };
