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
exports.getFinanceEntriesController = getFinanceEntriesController;
exports.getFinanceSummaryController = getFinanceSummaryController;
exports.createFinanceEntryController = createFinanceEntryController;
exports.updateFinanceEntryController = updateFinanceEntryController;
exports.deleteFinanceEntryController = deleteFinanceEntryController;
const finance_service_1 = require("../services/finance.service");
function getFinanceEntriesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { from, to } = req.query;
            const entries = yield (0, finance_service_1.getFinanceEntriesService)({ from, to });
            res.status(200).json({ success: true, message: 'Finance entries fetched', data: entries });
        }
        catch (error) {
            next(error);
        }
    });
}
function getFinanceSummaryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { from, to } = req.query;
            const summary = yield (0, finance_service_1.getFinanceSummaryService)({ from, to });
            res.status(200).json({ success: true, message: 'Finance summary fetched', data: summary });
        }
        catch (error) {
            next(error);
        }
    });
}
function createFinanceEntryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entry = yield (0, finance_service_1.createFinanceEntryService)(req.body, req.user.id);
            res.status(201).json({ success: true, message: 'Finance entry created', data: entry });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateFinanceEntryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const entry = yield (0, finance_service_1.updateFinanceEntryService)(req.params.id, req.body);
            res.status(200).json({ success: true, message: 'Finance entry updated', data: entry });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteFinanceEntryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, finance_service_1.deleteFinanceEntryService)(req.params.id);
            res.status(200).json({ success: true, message: 'Finance entry deleted', data: {} });
        }
        catch (error) {
            next(error);
        }
    });
}
