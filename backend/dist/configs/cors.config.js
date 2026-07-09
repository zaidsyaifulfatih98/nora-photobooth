"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const dotenv_config_1 = require("./dotenv.config");
exports.corsOptions = {
    origin: function (origin, callback) {
        if (origin && !(dotenv_config_1.CORS_WHITELIST === null || dotenv_config_1.CORS_WHITELIST === void 0 ? void 0 : dotenv_config_1.CORS_WHITELIST.includes(origin))) {
            callback(new Error('Origin not allowed by CORS'));
        }
        else {
            callback(null, true);
        }
    },
    credentials: true,
};
