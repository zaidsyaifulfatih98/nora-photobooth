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
exports.getPackagesController = getPackagesController;
exports.createPackageController = createPackageController;
exports.updatePackageController = updatePackageController;
exports.deletePackageController = deletePackageController;
const packages_service_1 = require("../services/packages.service");
function getPackagesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const packages = yield (0, packages_service_1.getPackagesService)(req.query.all === 'true');
            res.status(200).json({ success: true, message: 'Packages fetched', data: packages });
        }
        catch (error) {
            next(error);
        }
    });
}
function createPackageController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pkg = yield (0, packages_service_1.createPackageService)(req.body);
            res.status(201).json({ success: true, message: 'Package created', data: pkg });
        }
        catch (error) {
            next(error);
        }
    });
}
function updatePackageController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pkg = yield (0, packages_service_1.updatePackageService)(req.params.id, req.body);
            res.status(200).json({ success: true, message: 'Package updated', data: pkg });
        }
        catch (error) {
            next(error);
        }
    });
}
function deletePackageController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, packages_service_1.deletePackageService)(req.params.id);
            res.status(200).json({ success: true, message: 'Package deleted', data: {} });
        }
        catch (error) {
            next(error);
        }
    });
}
