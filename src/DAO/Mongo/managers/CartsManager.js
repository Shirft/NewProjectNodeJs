import cartsModel from "../models/carts.js";

export default class CartsManager{

    getCart = async () => {

        return await cartsModel.find()

    };

    getCartById = async (cartId) => {

        return await cartsModel.findOne({ _id: cartId })

    }

    addCart = async (products) => {

        const cartCreated = await cartsModel.create({})
        products.forEach(product => cartCreated.products.push(product));
        cartCreated.save();
        return cartCreated;


    }

    updateCart = async (cid, productsCart) => {

        const cart = await cartsModel.findOne({ _id: cid })

        const findProduct = cart.products.some((product) => product._id.toString() === productsCart._id)

        if (findProduct) {

            await cartsModel.updateOne({ _id: cid, "products._id": productsCart._id }, { $inc: { "products.$.quantity": productsCart.quantity } })
            return await cartsModel.findOne({ _id: cid })

        }

        await cartsModel.updateOne({ _id: cid }, { $push: { products: { _id: productsCart._id, quantity: productsCart.quantity } } })
            return await cartsModel.findOne({ _id: cid })
    }

}
