import mongoose from "mongoose";


const newsale = new mongoose.Schema({
    saleProducts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Products' // Make sure this references your Products model
        }
      ]
 
})

const Sales = mongoose.model('sales' , newsale)
 
export default Sales