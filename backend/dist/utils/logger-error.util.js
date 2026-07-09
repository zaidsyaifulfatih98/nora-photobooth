"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logger = void 0;
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, printf, colorize, errors } = winston_1.format;
const logFormat = printf((_a) => {
    var { timestamp, level, message, stack } = _a, rest = __rest(_a, ["timestamp", "level", "message", "stack"]);
    const meta = rest.meta ? JSON.stringify(rest.meta, null, 2) : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${stack ? `\nStack: ${stack}` : ''} ${meta}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true })),
    transports: [
        new winston_1.transports.Console({
            format: combine(colorize(), printf(({ message }) => {
                return typeof message === 'string'
                    ? message
                    : JSON.stringify(message);
            })),
        }),
        new winston_1.transports.File({
            filename: '/tmp/error.log',
            level: 'error',
            format: logFormat,
        }),
        ,
        new winston_1.transports.File({
            filename: '/tmp/combined.log',
            format: logFormat,
        }),
        ,
        new winston_1.transports.DailyRotateFile({
            filename: '/tmp/%DATE%-app.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: logFormat,
        }),
    ],
});
/* 💡 Helper agar type-safe */
exports.log = {
    error: (message, meta) => exports.logger.error({ message, meta }),
    warn: (message, meta) => exports.logger.warn({ message, meta }),
    info: (message, meta) => exports.logger.info({ message, meta }),
    http: (message, meta) => exports.logger.http({ message, meta }),
    debug: (message, meta) => exports.logger.debug({ message, meta }),
};
