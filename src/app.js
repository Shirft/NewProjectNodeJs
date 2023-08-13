const routeProducts=require('./Routers/products.router');
const routeCarts=require('./Routers/carts.router');
const express=require('express');
const app=express();
const port=8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', routeProducts);
app.use('/api/carts', routeCarts);

app.listen(port, ()=> console.log(`Port ${port} listening.`));