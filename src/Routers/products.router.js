const ProductManager=require('../product');
const express=require('express');
const router=express.Router();

const product=new ProductManager();

router.get('/', async(req, res)=>{

    try{

        let limit =req.query.limit;
        const products=await product.getProducts();
    
        if(!limit){
            return res.status(200).send({products});
        }
    
        if(isNaN(Number(limit))){
            return res.status(400).send({status:'error', message:'Limit not found'});
        }
    
        if(products.length>limit){
            const productsLimit=products.slice(0, limit);
            return res.status(200).send({productsLimit});
        }
    
        return res.status(200).send({products})

    }catch(error){

        return res.status(500).send({status:'error', message:'Internal server error'});

    }

});

router.get('/:pid', async(req, res)=>{

    try{

        const id=parseInt(req.params.pid);
        const productsId= await product.getProductById(id);

        if(isNaN(Number(id))){
            return res.status(400).send({status: 'error', message:'Product not found'})
        }
    
        if(productsId.status=='error'){
            return res.status(400).send(productsId);
        }
    
        return res.status(200).send(productsId);

    }catch(error){

        return res.status(500).send({status:'error', message:'Internal server error'});

    }
    
});

router.post('/', async(res,req)=>{
   
    try{



    }catch(error){

        return res.status(500).send({status:'error', message:'Interval server error'});

    }

});

router.put('/:pid', async(res, req)=>{

    try{

        const idUp=parseInt(req.params.pid);
        const bodyUp=req.body;
        const upgrade=await product.updateProduct(idUp, bodyUp);
        return res.status(200).send({upgrade});

    }catch(error){

        return res.status(500).send({status:'error', message:'Internal server error'});

    }

});

router.delete('/:pid', async(res, req)=>{

    try{

        const idDel=parseInt(req.params.pid);
        const delP=await product.deleteProduct(idDel);

        if(delP.status=='error'){
            return res.status(400).send(delP)
        }
        
        return res.status(200).send(delP);

    }catch(error){

        return res.status(500).send({status:'error', message:'Internal server error'});

    }

});

module.exports=router;