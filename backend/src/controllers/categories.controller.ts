import { Request, Response } from "express";
import { categoriesService } from "../services/categories.service";

export const categoriesController ={
    async getAll(req: Request , res: Response){
        const categories = await categoriesService?.getAll();

        res.status(200).json({
            success: true , 
            massage: 'get categories successfull',
            data: categories
        })
    }
}