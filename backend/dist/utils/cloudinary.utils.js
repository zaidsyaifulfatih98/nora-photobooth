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
exports.cloudinaryUpload = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_config_1 = require("../configs/dotenv.config");
cloudinary_1.v2.config({
    cloud_name: dotenv_config_1.CLOUDINARY_CLOUD_NAME,
    api_key: dotenv_config_1.CLOUDINARY_API_KEY,
    api_secret: dotenv_config_1.CLOUDINARY_API_SECRET,
});
const cloudinaryUpload = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload_stream({
            folder: 'uploads',
        }, (error, result) => {
            if (error || !result) {
                return reject(error);
            }
            resolve({ secureUrl: result === null || result === void 0 ? void 0 : result.secure_url });
        }).end(file);
    });
});
exports.cloudinaryUpload = cloudinaryUpload;
