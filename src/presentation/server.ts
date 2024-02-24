import express, { Router } from 'express';

interface ServerOptions {
    PORT: number,
    PUBLIC_PATH?: string,
    routes: Router,
}

export class Server {

    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: ServerOptions){
        const { PORT, PUBLIC_PATH = 'public', routes } = options;
        this.port = PORT;
        this.public_path = PUBLIC_PATH;
        this.routes = routes;
    }

    public readonly app = express();
    private serverListener?: any;

    async startServer() {

        //Middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );

        //Public Folder
        this.app.use(express.static(this.public_path));

        //Routes
        this.app.use( this.routes );
        
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port: ${ this.port }`);
        });
    }

    public closeServer() {
        this.serverListener?.close();
    }
}