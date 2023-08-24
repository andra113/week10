"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
}
exports.default = errorHandler;
