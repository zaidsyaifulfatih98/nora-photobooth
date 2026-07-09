"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGalleryController = getGalleryController;
exports.createGalleryPhotoController = createGalleryPhotoController;
exports.updateGalleryPhotoController = updateGalleryPhotoController;
exports.deleteGalleryPhotoController = deleteGalleryPhotoController;
const app_error_utils_1 = require("../utils/app-error.utils");
const gallery_service_1 = require("../services/gallery.service");
function getGalleryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const photos = yield (0, gallery_service_1.getGalleryService)(req.query.all === 'true');
            res.status(200).json({ success: true, message: 'Gallery fetched', data: photos });
        }
        catch (error) {
            next(error);
        }
    });
}
function createGalleryPhotoController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.file) {
                throw (0, app_error_utils_1.AppError)('Image file is required', 400);
            }
            const { caption, order } = req.body;
            const photo = yield (0, gallery_service_1.createGalleryPhotoService)(req.file.buffer, caption, order ? Number(order) : undefined);
            res.status(201).json({ success: true, message: 'Photo uploaded', data: photo });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateGalleryPhotoController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const photo = yield (0, gallery_service_1.updateGalleryPhotoService)(req.params.id, req.body);
            res.status(200).json({ success: true, message: 'Photo updated', data: photo });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteGalleryPhotoController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, gallery_service_1.deleteGalleryPhotoService)(req.params.id);
            res.status(200).json({ success: true, message: 'Photo deleted', data: {} });
        }
        catch (error) {
            next(error);
        }
    });
}
