import { Request, Response, NextFunction } from "express"
import { menusService } from "../services/menus.service";

const isCUID = (value: string) => /^c[a-z0-9]{24}$/.test(value);


export const menusController = {
    async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const products = await menusService.getAll()

            res.status(201).json({
                success : true,
                message: 'get products was successfull',
                data: 
                    products
                
            })

        }catch(error){
            next()
        }

    },
    async getById( req: Request, res: Response, next: NextFunction){
        const id = req?.params.id as string

        if (!isCUID(id)) {
            res.status(401).json({
                success : false ,
                message : 'id is invalid'
            })
        }


        const productById = await menusService.getById(id)

        res.status(200).json({
            success : true ,
            message : 'get all by id was successfully',
            data : productById
        })
    },
    async create(req: Request, res: Response){
        try{
            
            let files:Express.Multer.File[] = []
            const {name, price, categoryId} = req?.body;

            if (Array.isArray(req?.files)){
                files = req?.files;

            }else {
                files = []
            }

            await menusService?.create(files, {name, price, categoryId})

            res.status(201).json({
                success : true,
                message: 'create image was successfull',
                data: {
                    name,
                    price
                }
            })

        }catch(error){
            res.status (401).json({
                success : false,
                message: 'create iamage was failure',
                data : error
            })

        }

    },
    async update(req: Request, res: Response , next: NextFunction){
        try{
            console.log('cek cek')
            const id = req.params.id as string;
            const {name, price, categoryId} = req?.body ;
            let  files : Express.Multer.File [] = [] ; 

            if (Array.isArray(req?.files)){
                files = req?.files;

            }else {
                files = []
            }

            if(!isCUID(id)) { 
                res.status(400).json({
                    success : false ,
                    message : 'invalid id bos'
                })
                return;
            } 
            
            const menusUpdate = await menusService.update(id , files, {name,price,categoryId})
            

            res.status(200).json({
                success : true,
                message : 'update was successfully',
                data : menusUpdate
                
            })

        } catch(error){
            next()
        }

    },
    async delete(req: Request, res: Response, next: NextFunction){
        const id = req?.params.id as string ;

        if (!isCUID(id)){
            res.status(201).json({
                success : false, 
                message : 'id is invalid'
            })
        }

        const productDeleted = await menusService.delete(id)

        res.status(201).json({
            success : true,
            message : 'delete was successfully',
            data : productDeleted
        })

    }
    
}