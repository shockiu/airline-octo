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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("../config/db");
const index_routes_1 = require("../routes/index.routes");
class Server {
    constructor() {
        this.port = process.env.PORT || '8084';
        this.apiPath = {
            routes: '/api/v1'
        };
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Parse JSON from request
        this.app.use(express_1.default.json());
        // Morgan config
        // this.app.use(this.morganConfigMiddleware());
    }
    routes() {
        this.app.use(this.apiPath.routes, index_routes_1.routes);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let name = db_1.db.getDatabaseName();
                yield db_1.db.authenticate().then(() => {
                    console.log(`DATABASE CONNECTION SUCCESSFULL 💯 ${name}`);
                });
            }
            catch (error) {
                console.error(error);
                console.log('No pudo contentarse a la BD');
                setTimeout(() => __awaiter(this, void 0, void 0, function* () { return yield this.dbConnection(); }), 240000);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('VERSION ' + process.env.VERSION);
            console.log(`SERVER EXPRESS ONLINE PORT: ${this.port}`);
        });
    }
    // verificar uso
    get appServer() {
        return this.app;
    }
}
exports.Server = Server;
