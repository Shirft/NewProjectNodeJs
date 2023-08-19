const CartManager=require('../carts');
const express=require('express');
const router=express.Router();

const cart=new CartManager();

router.get('/', async(req, res)=>{

    try{

        let limit =req.query.limit;
        const carts=await cart.getCart();
    
        if(!limit){
            return res.status(200).send({carts});
        }
    
        if(isNaN(Number(limit))){
            return res.status(400).send({status:'error', message:'Limit not found'});
        }
    
        if(carts.length>limit){
            const cartsLimit=carts.slice(0, limit);
            return res.status(200).send({cartsLimit});
        }
    
        return res.status(200).send({carts});

    }catch(error){

        return res.status(500).send({status:'error', message:'Interval server error'});

    }

});

router.get('/:cid', async(req, res)=>{

    try{

        const id=req.params.cid;

        const validated=await cart.getCartById(id);
        if(validated.status=='error'){
            return res.status(400).send(validated);
        }
        return res.status(200).send(validated);

    }catch(error){

        return res.status(500).send({status:'error', message:'Internal server error'});

    }


});

router.post('/', async (req, res) => {

    try{

        const carts = req.body;

        const campoVacio = Object.values(carts).find((value) => value === "");
        if (campoVacio) {
    
          return res.status(400).send({ status: "error", message: "Falta completar algún campo" });
    
        }
      
        if (carts.status === "error"){
    
            return res.status(400).send({ valueReturned });
    
        }
            
        await cart.addCart(carts);
        return res.status(200).send({status:'success', message:'Carrito agregado correctamente'});

    }catch(error){

        return res.status(500).send({status:'error', message:'Internal server error'});

    }
    
  });

router.post('/:cid/product/:pid', async(req, res)=>{

    try{

        let producto = req.body;
        const { cid, pid } = req.params;
    
        const{
        product,
        quantity,
        }=producto;
    
        producto.product == pid;
    
        const carrito = await cart.getCartById(cid);
        if (carrito.error){
            return res.status(400).send({ carrito });
        }
            
    
        let productoEncontrado = carrito.products.findIndex((prod) => prod.product == pid);
    
        if (productoEncontrado !== -1) {
            carrito.products[productoEncontrado].quantity = Number(carrito.products[productoEncontrado].quantity) + Number(producto.quantity);
            await cart.updateCart(cid, carrito);
            return res.status(200).send({ statusbar: "success", message: "producto agregado" });
        }
    
        carrito.products.push(producto);
        await cart.updateCart(cid, carrito);
        return res.status(200).send({status: "success",message: "producto agregado", carrito: carrito.products });

    }catch(error){

        return res.status(500).send({status:'error', message:'Interval server error'});

    }
    
  });



module.exports=router;