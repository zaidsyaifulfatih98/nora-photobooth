"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(payload, secretkey, options) {
    return jsonwebtoken_1.default.sign(payload, secretkey, options);
}
function verifyToken(token, secretkey) {
    return jsonwebtoken_1.default.verify(token, secretkey);
}
