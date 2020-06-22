import { Router } from 'express';
import files from '../controllers/upload';

const fileRoutes = Router();

// create a file
fileRoutes.post('/upload', files.upload);
export default fileRoutes;
