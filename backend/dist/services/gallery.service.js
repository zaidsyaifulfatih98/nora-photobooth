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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGalleryService = getGalleryService;
exports.createGalleryPhotoService = createGalleryPhotoService;
exports.updateGalleryPhotoService = updateGalleryPhotoService;
exports.deleteGalleryPhotoService = deleteGalleryPhotoService;
const pool_connection_config_1 = __importDefault(require("../configs/pool-connection.config"));
const app_error_utils_1 = require("../utils/app-error.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
function getGalleryService() {
    return __awaiter(this, arguments, void 0, function* (includeInactive = false) {
        return pool_connection_config_1.default.galleryPhoto.findMany({
            where: Object.assign({ deletedAt: null }, (includeInactive ? {} : { isActive: true })),
            orderBy: { order: 'asc' },
        });
    });
}
function createGalleryPhotoService(file, caption, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const { secureUrl } = yield (0, cloudinary_utils_1.cloudinaryUpload)(file);
        return pool_connection_config_1.default.galleryPhoto.create({
            data: {
                url: secureUrl,
                caption,
                order: order !== null && order !== void 0 ? order : 0,
            },
        });
    });
}
function updateGalleryPhotoService(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield pool_connection_config_1.default.galleryPhoto.findFirst({ where: { id, deletedAt: null } });
        if (!existing) {
            throw (0, app_error_utils_1.AppError)('Photo not found', 404);
        }
        return pool_connection_config_1.default.galleryPhoto.update({ where: { id }, data });
    });
}
function deleteGalleryPhotoService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield pool_connection_config_1.default.galleryPhoto.findFirst({ where: { id, deletedAt: null } });
        if (!existing) {
            throw (0, app_error_utils_1.AppError)('Photo not found', 404);
        }
        return pool_connection_config_1.default.galleryPhoto.update({ where: { id }, data: { deletedAt: new Date() } });
    });
}
