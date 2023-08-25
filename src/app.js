const routeProducts=require('./Routers/products.router');
const routeCarts=require('./Routers/carts.router');
const routerViews=require('./Routers/views.router');
const ProductManager=require('./product');
const express=require('express');
const handlebars=require('express-handlebars');
const app=express();
const port=8080;
const {Server}=require('socket.io');
const pm= new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/api/products', routeProducts);
app.use('/api/carts', routeCarts);
app.use('/', routerViews);


const httpServer=app.listen(port, ()=> console.log(`Port ${port} listening.`));

const serverSocket = new Server(httpServer);

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

    
});
