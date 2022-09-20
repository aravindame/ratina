import winston from 'winston';

export const errorHandler = (error, req, res, next)=>{  
    if(error && error.message){
        winston.log('error', error.message, error);
        res.status(500).send(error.message);
    }
}