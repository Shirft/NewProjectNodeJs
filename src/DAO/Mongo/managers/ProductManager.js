import productModel from "../models/products.js";

export default class ProductManager{

    getProducts = (params) =>{
        return productModel.find(params);
    };

    getProductById = (params) =>{
        if(params){
            return productModel.findOne(params);
        }
        return {status:'error', message:'Product not found'};
        
    };

    addProduct = (product) =>{
        return productModel.create(product);
    };

    updateProduct = (id, product) =>{
        return productModel.updateOne({_id:id}, {$set:product});
    };

    deleteProduct = (id) =>{
        return productModel.deleteOne({_id:id});
    };

}