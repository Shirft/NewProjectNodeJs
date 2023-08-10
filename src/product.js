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

        const search=await this.getProducts();
        const searchId=search.find((e)=>e.id==id);
        if(searchId){
           return searchId;
        }
        return {status:'error', message: 'Product not found'};

    };

    updateProduct=async(id, body)=>{
 
        const productsUpParse=await this.getProducts();
        let update = Object.assign(productsUpParse[id - 1], body);

        productsUpParse[id - 1] = update;
        this.products = productsUpParse;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        console.log(`Producto id ${id} actualizado`);
    };

    deleteProduct=async(id)=>{

        const readProducts=await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
            products.splice(index, 1);

            await fs.promises.writeFile(this.path, JSON.stringify(products), "utf-8");

            return 'Producto Eliminado';

        } else {

            return {status:'error', message:'Not Found'};

        };

    };
}

module.exports=ProductManager;

