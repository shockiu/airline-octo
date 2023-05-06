import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from '../config/db';
// import routesApi from '../routes/routes';
import chalk from 'chalk';

export class Server {
    
        private app: Application;
        private port: string = process.env.PORT || '8084';
        private apiPath = {
            routes: '/api/v1'
        }
  
        constructor() {
            this.app = express();
            this.middlewares();
            // this.routes();
            this.dbConnection();
        }

        middlewares() {

            // CORS
            this.app.use( cors() );

            // Parse JSON from request
            this.app.use( express.json() );

            // Morgan config
            this.app.use(this.morganConfigMiddleware());
        }
  
        morganConfigMiddleware() {
            return morgan((tokens: any, req: any, res: any)  => {
                return [
                    chalk.hex('#ff4757').bold('⚡ Morgan --> '),
                    chalk.hex('#34ace0').bold(tokens.method(req, res)),
                    chalk.hex('#ffb142').bold(tokens.status(req, res)),
                    chalk.hex('#ff5252').bold(tokens.url(req, res)),
                    chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
                    chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res)),
                    chalk.yellow(tokens['remote-addr'](req, res)),
                    chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
                    chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
                ].join(' ');
            })
        }

        /*routes() {
           this.app.use( this.apiPath.routes,  routesApi );
        }*/

        async dbConnection() {
            try {
                let name = db.getDatabaseName();
                await db.authenticate().then(() => {
                    console.log(chalk.italic.magentaBright(`DATABASE CONNECTION SUCCESSFULL 💯 ${name}`));
                });
            } catch (error) {
                console.error(error);
                console.log('No pudo contentarse a la BD');
            }
        }


        listen() {
            this.app.listen( this.port, () => {
                console.log(chalk.blueBright('VERSION ' + process.env.VERSION ))
                console.log( chalk.blueBright(`SERVER EXPRESS ONLINE PORT: ${this.port}`));
            });
        }

        // verificar uso
        get appServer() {
            return this.app;
        }

}