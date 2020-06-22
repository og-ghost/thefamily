import { Router } from 'express';
import users from '../controllers/user';
import user from '../middleware/user';
// import auth from '../middleware/auth';

const userRoutes = Router();

// create a user
userRoutes.post('/user/create', user.validateuser, users.create);
userRoutes.post('/user/read', users.read);
userRoutes.post('/auth/signup', user.validateSignup, users.signUp);
userRoutes.post('/auth/login', user.validateSignin, users.signIn);

export default userRoutes;
