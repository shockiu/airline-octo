import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { db } from '../config/db';
import {routes} from '../routes/index.routes';

export class Server {
    
        private app: Application;
        private port: string = process.env.PORT || '8084';
        private apiPath = {
            routes: '/api/v1'
        }
  
        constructor() {
            this.app = express();
            this.middlewares();
            this.routes();
            this.dbConnection();
        }

        middlewares() {

            // CORS
            this.app.use( cors() );

            // Parse JSON from request
            this.app.use( express.json() );

            // Morgan config
           // this.app.use(this.morganConfigMiddleware());
        }
      
        routes() {
           this.app.use( this.apiPath.routes,  routes );
        }

        async dbConnection() {
            try {
                let name = db.getDatabaseName();
                await db.authenticate().then(() => {
                    console.log(`DATABASE CONNECTION SUCCESSFULL 💯 ${name}`);
                });
            } catch (error) {
                console.error(error);
                console.log('No pudo contentarse a la BD');
                setTimeout(async ()=> await this.dbConnection(), 240000)
            }
        }


        listen() {
            this.app.listen( this.port, () => {
                console.log('VERSION ' + process.env.VERSION )
                console.log(`SERVER EXPRESS ONLINE PORT: ${this.port}`);
            });
        }

        // verificar uso
        get appServer() {
            return this.app;
        }

}