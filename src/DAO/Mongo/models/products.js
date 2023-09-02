import mongoose from 'mongoose';

const collection = "products";
const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    thumbnails:{
        type:Array,
        default:[]
    }
},{timestamps:true})

const productModel = mongoose.model(collection, schema);

export default productModel;