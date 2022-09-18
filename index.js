import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import genres from './routes/genres.js';
import customer from './routes/customers.js';
import Mongoose from "mongoose";

var app = null;

const getExpressInstance = ()=>{
    if(app) return app;
    app = express();
}

const applyMiddlewares = ()=>{
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));
    app.use(helmet());
    (app.get('env')==='development') && app.use(morgan('tiny'));
}

const connectDB = ()=> {
    const host = 'mongodb://localhost/ratina';
    Mongoose.connect(host)
        .then(()=>console.log('Connection success.....'))
        .catch((error)=>console.log(error));
}

const applyRoutes = ()=> {
    app.use('/api/genres', genres);
    app.use('/api/customer', customer);
}

const startApp = ()=> {    
    const port = process.env.PORT || 3000;
    app.listen(port, ()=>console.log(`listening on port ${port}`));
}

(()=>{
    getExpressInstance();
    applyMiddlewares()
    connectDB();
    applyRoutes();
    startApp();
})();

