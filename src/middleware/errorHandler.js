"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    // Format error
    if (err.name === 'UsernameUnavailableError') {
        console.log(err.status);
        res.status(409).json({ error: err.message });
    }
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
}
exports.default = errorHandler;
