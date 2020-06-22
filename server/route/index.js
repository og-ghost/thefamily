import express from 'express';

import userRoutes from './user';
import trackRoutes from './track';
import blogRoutes from './blog';
import fileRoutes from './file';
import propertyRoutes from './properties';
import paypal from './paypal';

const routes = express.Router();

routes.use(userRoutes, blogRoutes, fileRoutes, propertyRoutes, trackRoutes, paypal);

export default routes;
