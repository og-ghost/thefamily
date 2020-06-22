import { Router } from 'express';
import property from '../controllers/properties';
import properties from '../middleware/properties';

const propertyRoutes = Router();

// create a user
propertyRoutes.post('/property/create', properties.validateProperty, property.create);
propertyRoutes.post('/property/read', property.read);

export default propertyRoutes;
