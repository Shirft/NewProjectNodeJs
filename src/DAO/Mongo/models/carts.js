import mongoose from "mongoose";

const collection = "carts";
const schema = new mongoose.Schema({
    products:{
        type:[{
            _id:{
                type: mongoose.Types.ObjectId,
                ref:'products'
            },
            quantity:{
                type:Number,
                default:1
            }
        }],
        default:[]
    }
}, {timestamps:true})

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;