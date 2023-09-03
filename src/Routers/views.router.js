import ProductManager from '../DAO/Mongo/managers/productManager.js';
import {Router} from 'express';

const router= Router();
const pm=new ProductManager();


router.get('/', async(req, res)=>{
    try {

        const products = await pm.getProducts();
        console.log(products);
        res.render("home", { valueReturned: products, style: 'home.css' });

    }
    catch (error) {

        res.status(500).send({status:'error', message:'Internal server error'});

    }

})

router.use('/realTimeProducts', (req, res)=>{

    res.render('realTimeProducts', {});

});

export default router;