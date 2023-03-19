import { writeFile, readFile } from 'fs/promises'

class ProductService {

    async createList(data){
        try{
           await writeFile('products.json', JSON.stringify(data, null, 2));
        }catch(error){
          throw  new Error(error);
        }
        
    }

    async listProducts(){
        const productList = await readFile('products.json', 'utf-8');

        return JSON.parse(productList);
    }

    async stockProducts(){
        const productList = await this.listProducts();
        
        const stockList = productList.map(item =>{
             const obj = {
                "nome": item.nome,
                "qtd": item.qtde,
                "preco": item.preco,
                "valor_estoque": item.preco * item.qtde
            }
            return obj
        });

        return stockList;
    }

    async stockTotal(){
        const stockList = await this.stockProducts();

        const valorTotal = stockList.reduce((total, item) => { 
            return total + item.valor_estoque;
        }, 0);
        return valorTotal.toFixed(2);
    }
}

export default new ProductService;