const routeProducts=require('./Routers/products.router');
const routeCarts=require('./Routers/carts.router');
const routerViews=require('./Routers/views.router');
const express=require('express');
const handlebars=require('express-handlebars');
const app=express();
const port=8080;
//const server=require('socket.io');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static('public'));

app.engine('handlebars', handlebars.engine());
app.set('views', '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', routeProducts);
app.use('/api/carts', routeCarts);
app.use('/', routerViews);

app.listen(port, ()=> console.log(`Port ${port} listening.`));

