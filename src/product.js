const fs=require('fs');

class ProductManager{
    constructor(){
            this.idCounter=1;
            this.path='./Products.json';
            this.products=[];
    }

    addProduct= async(title, description, price, thumbnail, code, stock)=>{
        const product={
            id:this.idCounter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        /*
        for(const p in product){
            if (product[p]==0){
                return console.log('No pueden haber campos vacios');
                
            }
        }*/
        if(!Object.values(product).every(e=>e)){
            return console.log('No pueden haber campos vacios');
        }

        const validation=this.products.find((e)=>e.code==product.code)
        if(validation){
            return console.log('codigo ingresado repetido');
            
        }
        console.log('Producto agregado correctamente ')
        this.products.push(product);
        this.idCounter++;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));

    };

    getProducts=async()=>{

        if(fs.existsSync(this.path)){
            const listProducts=await fs.promises.readFile(this.path, 'utf-8');
            const read=JSON.parse(listProducts);
            return read;
        }
        console.log(this.products);
        
    
    };

    getProductById=async(id)=>{
        //const search=await fs.promises.readFile(this.path, 'utf-8');
        const search=await this.getProducts();
        const searchId=search.find((e)=>e.id==id);
        if(searchId){
            //return console.log(`Producto encontrado:\n ${JSON.stringify(searchId)}`);
           return searchId;
        }
        return {status:'error', message: 'Product not found'};
    };

    updateProduct=async(id, body)=>{
        /*const productsUp = await fs.promises.readFile(this.path, "utf-8");
        const productsUpParse = JSON.parse(productsUp);*/
        const productsUpParse=await this.getProducts();
        let update = Object.assign(productsUpParse[id - 1], body);

        productsUpParse[id - 1] = update;
        this.products = productsUpParse;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        console.log(`Producto id ${id} actualizado`);
    };

    deleteProduct=async(id)=>{
        /*const readProducts= await fs.promises.readFile(this.path, 'utf-8');
        const productsR=JSON.parse(readProducts);*/
        const readProducts=await this.getProducts();
        /*if(productsR.find(e=>e.id==id)){
            const productFilter=productsR.filter(e=>e.id!=id);
            this.products=productFilter;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return console.log(`Producto id ${id} eliminado`);
        }
        console.log(`Producto id ${id} no encontrado`);*/
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);

            await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");

            console.log("Producto eliminado");

        } else {

            console.log("Not Found");

        };

    };
}

module.exports=ProductManager;
//const producto=new ProductManager();
//arreglo vacio
//producto.getProducts();

//se agrega nuevo producto
//producto.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

//se muestra producto nuevo producto agregado al arreglo
//producto.getProducts();

//Busqueda producto por id
//producto.getProductById(1);

//actualizacion producto
//producto.updateProduct(1, {title:'comadreja'});

//elimacion producto
//producto.deleteProduct(1);

