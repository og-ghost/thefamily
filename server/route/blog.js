import { Router } from 'express';
import blogs from '../controllers/blog';
import blog from '../middleware/blog';

const blogRoutes = Router();

// create a user
blogRoutes.post('/blog/create', blog.validateBlog, blogs.create);
blogRoutes.post('/blog/read', blogs.read);

export default blogRoutes;
