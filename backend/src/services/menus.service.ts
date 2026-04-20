import { Product } from "@prisma/client";
import prisma from "../configs/pool-connection.config";
import { cloudinaryUpload } from "../utils/cloudinary.utils";

export const menusService = {
    async getAll(){
        return await prisma.product.findMany({
            where: { deletedAt: null },
            select : {
                id : true,
                name: true,
                price: true,
                isAvailable: true,
                categories: {
                    select: { name: true }
                },
                productImages: {
                    select: { id: true, url: true }
                }
            }
        })
    },

    async getById (id : string){
        return await prisma.product.findUnique({
            where : {id, deletedAt: null} ,
            select : {
                id : true,
                name : true,
                price : true, 
                categoryId : true,
                

            }

        })
    },
    async create(
        files: Express.Multer.File[],
        {name, price, categoryId}: Pick <Product, 'name' | 'price' | 'categoryId'>
    ){
       await prisma.$transaction(async(tx)=> {
            const createdProduct = await tx.product.create({
                data: {
                    name,
                    price,
                    categoryId
                }
            })

            // IF USING LOCAL STORAGE
            // const productImagesData = files.map((file: Express.Multer.File)=>{
            //     return {url: file?.filename, productId: createdProduct?.id}
            // })

            

            // IF USING CLAUDINARY

            const cloudinaryUploaded = await files?.map(
                async(file: Express.Multer.File)=>{
                const {secureUrl} = await cloudinaryUpload(file?.buffer)
                return {url : secureUrl, productId : createdProduct?.id}
                
            })

            const productImageData = await Promise.all(cloudinaryUploaded)
            console.log(productImageData)

            await tx.productImage.createMany({
                data: productImageData,
            })

       })
    },
    async update(
        id: string ,
        files : Express.Multer.File[] , 
        {name, price, categoryId} : Pick<Product, 'name' | 'price' | 'categoryId' >){
        
        console.log(files)
        
        return await prisma.$transaction(async(tx)=>{
            

            await tx.product.update({
                where : {id},
                data : {name, price, categoryId}
            })
            

            const cloudinaryUploaded = files.map(async(file : Express.Multer.File)=>{
                    const {secureUrl} = await cloudinaryUpload(file.buffer)
                    return {url : secureUrl , productId : id}
                })


                const productImageData = await Promise.all(cloudinaryUploaded)
                
                console.log(productImageData)
            
            
            tx.productImage.updateMany({
                data : productImageData , 
                where : {
                        id
                    }
                 })

            
        })

    },

    async delete (id : string){

        return await prisma.$transaction(async(tx)=> {

            await tx.productImage.updateMany({
                where : {productId : id},
                data : {deletedAt: new Date()}
            }),


            await tx.product.update({
                where : {id} ,
                data : {deletedAt: new Date()},
                select : {
                    id : true,
                    name : true,
                    price : true,
                    categoryId : true,
                }
            })
        })

    } 

}