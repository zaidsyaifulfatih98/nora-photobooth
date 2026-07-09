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
exports.getFinanceEntriesService = getFinanceEntriesService;
exports.getFinanceSummaryService = getFinanceSummaryService;
exports.createFinanceEntryService = createFinanceEntryService;
exports.updateFinanceEntryService = updateFinanceEntryService;
exports.deleteFinanceEntryService = deleteFinanceEntryService;
const pool_connection_config_1 = __importDefault(require("../configs/pool-connection.config"));
const app_error_utils_1 = require("../utils/app-error.utils");
function buildDateFilter({ from, to }) {
    if (!from && !to)
        return {};
    return {
        date: Object.assign(Object.assign({}, (from ? { gte: new Date(from) } : {})), (to ? { lte: new Date(to) } : {})),
    };
}
function getFinanceEntriesService(filters) {
    return __awaiter(this, void 0, void 0, function* () {
        return pool_connection_config_1.default.financeEntry.findMany({
            where: Object.assign({ deletedAt: null }, buildDateFilter(filters)),
            include: { createdBy: { select: { firstName: true, lastName: true } } },
            orderBy: { date: 'desc' },
        });
    });
}
function getFinanceSummaryService(filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield pool_connection_config_1.default.financeEntry.findMany({
            where: Object.assign({ deletedAt: null }, buildDateFilter(filters)),
            select: { type: true, amount: true },
        });
        const totalIncome = entries
            .filter((e) => e.type === 'INCOME')
            .reduce((sum, e) => sum + Number(e.amount), 0);
        const totalExpense = entries
            .filter((e) => e.type === 'EXPENSE')
            .reduce((sum, e) => sum + Number(e.amount), 0);
        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    });
}
function createFinanceEntryService(data, createdById) {
    return __awaiter(this, void 0, void 0, function* () {
        return pool_connection_config_1.default.financeEntry.create({
            data: {
                type: data.type,
                category: data.category,
                amount: data.amount,
                description: data.description,
                date: new Date(data.date),
                createdById,
            },
        });
    });
}
function updateFinanceEntryService(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield pool_connection_config_1.default.financeEntry.findFirst({ where: { id, deletedAt: null } });
        if (!existing) {
            throw (0, app_error_utils_1.AppError)('Finance entry not found', 404);
        }
        return pool_connection_config_1.default.financeEntry.update({
            where: { id },
            data: Object.assign(Object.assign({}, data), (data.date ? { date: new Date(data.date) } : {})),
        });
    });
}
function deleteFinanceEntryService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield pool_connection_config_1.default.financeEntry.findFirst({ where: { id, deletedAt: null } });
        if (!existing) {
            throw (0, app_error_utils_1.AppError)('Finance entry not found', 404);
        }
        return pool_connection_config_1.default.financeEntry.update({ where: { id }, data: { deletedAt: new Date() } });
    });
}
