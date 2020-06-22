import '@babel/polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Debug from 'debug';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './route';


dotenv.config();

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/v1', routes);
app.get('/', (request, response) => {
  response.render('index');
});

// Render quick credit documentation

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((error, request, response, next) => {
  if (error) {
    return response.status(500).json({
      status: 500,
      error: 'Server error'
    });
  }
  return next();
});

app.all('*', (request, response) => {
  response.status(404).send({ status: 404, message: 'Wrong request' });
});

const debug = Debug('http');
const PORT = process.env.PORT || 3000; // setup PORT to be used

app.listen(PORT, () => {
  debug(`Server is running on PORT ${PORT}`);
});

export default app;
