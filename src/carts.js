const fs=require('fs');

class CartManager{
    constructor (){
        this.idCounder=1;
        this.path='./Carts.json';
        this.cart=[];
    }

    addCart=async(products)=>{

        const cart={
            id:this.idCounder,
            products,
        };

        if(Object.values(cart).every(e=>e)){
            this.cart.push(cart);
            this.idCounder++;
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart)); 
            return {status:'success', message:'carrito agregado correctamente'};
        }
        return [];
       
    };

    getCart=async()=>{
        if(fs.existsSync(this.cart)){
            const readCart=await fs.promises.readFile(this.cart, 'utf-8');
            const read=JSON.parse(readCart);
            return read;
        }
        return this.cart;
    };

    getCartById=async(id)=>{

        const readFileId=await fs.promises.readFile(this.path, 'utf-8');
        const parseRead=JSON.parse(readFileId);

        if(parseRead[id-1]){
            return parseRead[id-1];
        }
        return {status:'error', message:'Error! el carrito no existe'};

    };

    updateCart=async(id, body)=>{

        const getFileCarts = await fs.promises.readFile(this.path, 'utf-8')
        const parseCarts = JSON.parse(getFileCarts);

        const findId = parseCarts.findIndex(product => product.id == id)
        if (findId === -1){
            return { status: "error", message: 'No se encontró el id' };
        }
            
        const returnedTarget = Object.assign(parseCarts[id - 1], body);

        parseCarts[id - 1] = returnedTarget;

        this.carts = parseCarts;
        await fs.promises.writeFile(this.path, JSON.stringify(this.cart));
        return {status:'success', message:'carrito actualizado'};

    };


}

module.exports=CartManager;