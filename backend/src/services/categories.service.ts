import prisma from "../configs/pool-connection.config";


export const categoriesService = {
    async getAll(){
        return await prisma.category.findMany()
    }
}