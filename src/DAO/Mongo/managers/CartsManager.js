import cartsModel from "../models/carts.js";
import ProductManager from "./productManager.js";

const pm = new ProductManager();

export default class CartsManager{

    getCarts = async () => {
        try {
            return await cartsModel.find()
        } catch (err) {
            console.log(err);
        }
    };

    getCartById = async (cartId) => {
        try {

            return await cartsModel.findOne({ _id: cartId }).lean()

        } catch (err) {
            return err.message
        }

    }

    addCart = async (products) => {
        try {
            const cartCreated = await cartsModel.create({})
            products.forEach(product => cartCreated.products.push(product));
            cartCreated.save()
            return cartCreated

        }
        catch (err) {
            // console.log(err.message);
            return err.message;

        }
    }

    addProductInCart = async (cid, productFromBody) => {

        try {
            const cart = await cartsModel.findOne({ _id: cid })
            const findProduct = cart.products.some(
                (product) => product._id._id.toString() === productFromBody._id)

            if (findProduct) {
                await cartsModel.updateOne(
                    { _id: cid, "products._id": productFromBody._id },
                    { $inc: { "products.$.quantity": productFromBody.quantity } })
                return await cartsModel.findOne({ _id: cid })
            }

            await cartsModel.updateOne(
                { _id: cid },
                {
                    $push: {
                        products: {
                            _id: productFromBody._id,
                            quantity: productFromBody.quantity
                        }
                    }
                })
            return await cartsModel.findOne({ _id: cid })


        }

        catch (err) {
            console.log(err.message);
            return err

        }
    }

    deleteProductInCart = async (cid, products) => {
        try {
            return await cartsModel.findOneAndUpdate(
                { _id: cid },
                { products },
                { new: true })

        } catch (err) {
            return err
        }

    }

    updateProductsInCart = async (cid, products) => {
        try {
            return await cartsModel.findOneAndUpdate(
                { _id: cid },
                { products },
                { new: true })

        } catch (err) {
            return err
        }
    }

    updateOneProduct = async (cid, products) => {
        
        await cartsModel.updateOne(
            { _id: cid },
            {products})
        return await cartsModel.findOne({ _id: cid })
    }

}
