import { Router } from "express";
import { menusController } from "../controllers/menus.controller";
import { uploader } from "../middleware/uploader.middlewere";

const menusRoute = Router()

menusRoute.get('/', menusController.getAll) ;
menusRoute.get ('/:id', menusController.getById)
menusRoute.post('/',
    uploader('src/uploads','IMG_MENU',['jpg', 'png'], 'memory').array('menuImages',3),  menusController.create)
menusRoute.put('/:id',
    uploader('src/uploads','IMG_MENU',['jpg', 'png'], 'memory').array('menuImages',3), menusController.update)
menusRoute.delete('/:id', menusController.delete)

export default menusRoute