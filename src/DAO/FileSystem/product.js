const fs=require('fs');

class ProductManager{
    constructor(){
            this.idCounter=1;
            this.path='./Products.json';
            this.products=[];
    }

    addProduct= async(title, description, price, thumbnail, code, status, category, stock)=>{

        const product={
            id:this.idCounter,
            title,
            description,
            price,
            thumbnail,
            code,
            status,
            category,
            stock,
        };

        if(!Object.values(product).every(e=>e)){
            return {status:'error', message:'No pueden haber campos vacios'};
        }

        const validation=this.products.find((e)=>e.code==product.code)
        if(validation){
            return {status:'error', message:'Codigo ingresado repetido'};
            
        }
        
        //this.products.push(product);
        const products= await this.getProducts();
        products.push(product);
        this.idCounter++;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return {status:'success', message:'Producto agregado correctamente', producto:product};

    };

    getProducts=async()=>{

        if(fs.existsSync(this.path)){
            const listProducts=await fs.promises.readFile(this.path, 'utf-8');
            const read=JSON.parse(listProducts);
            return read;
        }
        return [];
        
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
        return {status:'success', message:`Producto id ${id} actualizado`};
        
    };

    deleteProduct=async(id)=>{

        const readProducts=await this.getProducts();
        const index = readProducts.findIndex((p) => p.id === id);
        if (index !== -1) {
            readProducts.splice(index, 1);

            await fs.promises.writeFile(this.path, JSON.stringify(readProducts), "utf-8");
            return {status:'success', message:'Producto Eliminado'};

        } else {

            return {status:'error', message:'Not Found'};

        }

    };
}

module.exports=ProductManager;


