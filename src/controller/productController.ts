import { Request, Response } from 'express';
import ProductService from '../services/productService';

class productController{

    async create(req: Request, res: Response){
        await ProductService.createList(req.body);

        return res.status(201).send();
    }

    async list(req: Request, res: Response){
        const productList = await ProductService.listProducts();

        return res.status(200).send(productList);
    }

    async listStock(req: Request, res: Response){
        const stocklist = await ProductService.stockProducts();

        return res.status(200).send(stocklist);
    }

    async stockTotal (req: Request, res: Response){
        const stockTotal = await ProductService.stockTotal();

        return res.status(200).send(`Total Stock Value: ${stockTotal}`);
    }
}

export default new productController;