"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan")); // para ver x consola las peticiones
const helmet_1 = __importDefault(require("helmet")); //para seguridad, evitar ataques y cracks
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression")); // para reducir el peso de las respuestas del back al front
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config(); // cuando se cree el servidor necesitara la config
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/restapits';
        /*const options:any={ useNewUrlParser: true , useCerateIndex: true}
        const op:any='useFindAndModify'
        mongoose.set(op,true)  -----dont work!
        */
        mongoose_1.default.connect(MONGO_URI || process.env.MONGO_URI).then(db => console.log('DB is conected'));
        //configuracion
        this.app.set('port', process.env.PORT || 4000);
        //esto es si existe un puerto tomalo sino usa el p 4000
        //midlewares
        this.app.use(express_1.default.json()); //para poder interpretar json
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)()); //para reducir el peso de las respuestas
        this.app.use((0, cors_1.default)()); //para poder conectar nuestro backend con diferentes app cliente
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/posts', postRoutes_1.default);
        this.app.use('/api/users', userRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), // escucha en este puerto q iniciado antes
        () => console.log('Server on port', this.app.get('port')));
    }
}
const server = new Server();
server.start();
