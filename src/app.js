/*const routeProducts=require('./Routers/products.router');
const routeCarts=require('./Routers/carts.router');
const routerViews=require('./Routers/views.router');
const ProductManager=require('./DAO/FileSystem/product');
const express=require('express');
const handlebars=require('express-handlebars');
const app=express();
const PORT=process.env.PORT||8080;
const {Server}=require('socket.io');
const pm= new ProductManager();*/
import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import routerProducts from "./Routers/products.router.js";
import routerCarts from "./Routers/carts.router.js";
import routerViews from "./Routers/views.router.js";
import __dirname from "./utils.js";

const PORT=process.env.PORT||8080;
const app=express();
const url='mongodb+srv://mygue0908:UtM4Zu0rTztLaw6A@cluster7.sssws2v.mongodb.net/ecommerce?retryWrites=true&w=majority';
mongoose.connect(url);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/', routerViews);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');


const httpServer=app.listen(PORT, ()=> console.log(`Port ${PORT} listening.`));

/*const serverSocket = new Server(httpServer);

serverSocket.on('connection', async socket => {
    
    const data = await pm.getProducts();
  
    socket.emit('products', { data } );

    socket.on('product', async data => {
     
            const valueReturned = await pm.addProduct(data);
          
            socket.emit('message', valueReturned);


    })

    socket.on('delete', async data => {

        const result = await pm.deleteProduct(data)
        
        socket.emit('delete', result)
    })

    
});*/
