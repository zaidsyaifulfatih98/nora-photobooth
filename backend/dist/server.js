"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_config_1 = require("./configs/cors.config");
const logger_error_util_1 = require("./utils/logger-error.util");
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const packages_router_1 = __importDefault(require("./routers/packages.router"));
const gallery_router_1 = __importDefault(require("./routers/gallery.router"));
const reviews_router_1 = __importDefault(require("./routers/reviews.router"));
const finance_router_1 = __importDefault(require("./routers/finance.router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)(cors_config_1.corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', auth_router_1.default);
app.use('/api/packages', packages_router_1.default);
app.use('/api/gallery', gallery_router_1.default);
app.use('/api/reviews', reviews_router_1.default);
app.use('/api/finance', finance_router_1.default);
// Global error handler
app.use((error, req, res, next) => {
    const message = (error === null || error === void 0 ? void 0 : error.expose) ? error === null || error === void 0 ? void 0 : error.message : 'something went wrong';
    const statusCode = (error === null || error === void 0 ? void 0 : error.expose) ? error === null || error === void 0 ? void 0 : error.statusCode : 500;
    logger_error_util_1.log.error(`${req.method} ${req.url} - ${message}`, {
        statusCode,
        name: error.name,
        stack: error.stack,
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
    });
    res.status(statusCode).json({
        success: false,
        message: (error === null || error === void 0 ? void 0 : error.expose) ? error === null || error === void 0 ? void 0 : error.message : 'something went wrong',
        data: {},
    });
});
if (require.main === module) {
    app.listen(PORT, () => {
        logger_error_util_1.log.info(`Server is running on port ${PORT}`);
    });
}
exports.default = app;
