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
const express_1 = require("express");
//para validar rutas tambien se importa NextFunction
const User_1 = __importDefault(require("../models/User"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.send('posts')
            const users = yield User_1.default.find();
            res.json(users);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.params.url)
            const user = yield User_1.default.findOne({ username: req.params.username }).populate('posts', 'title url -_id');
            res.json(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const {name, email, password, username }= req.body
            const user = new User_1.default(req.body);
            console.log(user);
            yield user.save();
            res.json({ data: user });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const user = yield User_1.default.findOneAndUpdate({ username }, req.body, { new: true });
            // new true es para q almacene el obj nuevo, no el antiguo
            res.json(user);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            yield User_1.default.findOneAndDelete({ name });
            res.json({ response: 'User deleted successfully' });
        });
    }
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.get('/', this.getUsers);
            this.router.get('/:username', this.getUser);
            this.router.post('/', this.createUser);
            this.router.put('/:username', this.updateUser);
            this.router.delete('/:username', this.deleteUser);
        });
    }
}
const userRoutes = new UserRoutes;
exports.default = userRoutes.router;
