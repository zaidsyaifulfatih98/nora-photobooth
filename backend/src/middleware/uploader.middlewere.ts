import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from 'path';
import { cwd } from "process";
export function uploader (
    directory : string, 
    customFileName: string, 
    allowedFiletypes: string[],
    useStorage : string
){
        
    const storage = useStorage === 'disk'? multer.diskStorage({
    destination: function (_ , __, cb) {
        const mainDir = path?.join(cwd())
        cb(null, `${mainDir}/${directory}`)
    },
    filename: function (_, file, cb) {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extensionFile = file?.originalname?.split('.').pop();

        cb(null, `${customFileName}-${uniqueSuffix}.${extensionFile}`)
    }
    }) : multer.memoryStorage() ; 

   


    function fileFilter (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        const extensionFile = file?.originalname?.split('.').pop();

        if (!extensionFile || !allowedFiletypes.includes(extensionFile)){
            return cb(new Error ('Fie type not allowed'))
        }

    
    
    // To accept this file pass `false`, like so:
    cb(null, true)

   
    }   
    return multer({storage, fileFilter})
}