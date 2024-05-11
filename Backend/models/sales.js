import mongoose, { mongo } from "mongoose";


const newsale = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        require : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products',
    }, 
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders'
    }
 
})

const Sales = mongoose.model('sales' , newsale)
 
export default Sales