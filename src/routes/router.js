"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get('/users', userController_1.getUsersController);
router.post('/register', userController_1.createUserController);
router.post('/login', userController_1.loginUser);
exports.default = router;
