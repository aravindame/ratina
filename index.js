import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import genres from './routes/genres.js';
import connect from './orm/db.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

connect();

(app.get('env')==='development') && app.use(morgan('tiny'));

app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`listening on port ${port}`));