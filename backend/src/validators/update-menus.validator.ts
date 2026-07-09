import { body } from "express-validator";
import { AppError } from "../utils/app-error.utils";
export const updateMenusValidator = [
    body('name')
    .exists()
    .withMessage('name is required')
    .isString()
    .escape()
    .trim() ,

    body('price')
    .exists()
    .withMessage('price is required')
    .isString()
    .escape()
    .trim(),

    body('categoryId')
    .exists()
    .withMessage('Category is required')
    .isString()
    .escape()
    .trim(), 

    body().custom((_, {req}) =>{
        let files: Express.Multer.File[] = [];

    if (Array.isArray(req.files)) {
      files = req.files;
    } else if (req.files) {
      files =
        (req.files as Record<string, Express.Multer.File[]>).menuImages || [];
    }

     if (!files.length) {
      throw AppError('At least one file must be uploaded', 422);
    }

    const LIMITFILESIZE = 1024 * 1024 * 2;

    files?.forEach((file: Express.Multer.File) => {
      if (file?.size > LIMITFILESIZE) {
        throw AppError(`Maximum file size is ${LIMITFILESIZE}`, 422);
      }
    });

    return true;
    })
    
    
]