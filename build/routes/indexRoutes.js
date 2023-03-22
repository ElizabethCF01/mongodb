"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// req y res son tipos para las mismas, router para definir rutas
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)(); //Router devuelve un obj q nos permitira def las rutas
        this.routes();
    }
    routes() {
        this.router.get('/', (req, res) => res.send('/api/posts'));
    }
}
const indexRoutes = new IndexRoutes();
indexRoutes.routes();
exports.default = indexRoutes.router;
