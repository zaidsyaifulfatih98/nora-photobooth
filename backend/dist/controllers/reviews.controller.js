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
exports.getReviewsController = getReviewsController;
exports.createReviewController = createReviewController;
exports.updateReviewController = updateReviewController;
exports.deleteReviewController = deleteReviewController;
const reviews_service_1 = require("../services/reviews.service");
function getReviewsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reviews = yield (0, reviews_service_1.getReviewsService)(req.query.all === 'true');
            res.status(200).json({ success: true, message: 'Reviews fetched', data: reviews });
        }
        catch (error) {
            next(error);
        }
    });
}
function createReviewController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const review = yield (0, reviews_service_1.createReviewService)(req.body);
            res.status(201).json({ success: true, message: 'Review created', data: review });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateReviewController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const review = yield (0, reviews_service_1.updateReviewService)(req.params.id, req.body);
            res.status(200).json({ success: true, message: 'Review updated', data: review });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteReviewController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, reviews_service_1.deleteReviewService)(req.params.id);
            res.status(200).json({ success: true, message: 'Review deleted', data: {} });
        }
        catch (error) {
            next(error);
        }
    });
}
