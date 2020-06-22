import { Router } from 'express';
import paypal from '../controllers/paypal';

const PayRoutes = Router();

// create a file
PayRoutes.post('/paypal', paypal.paypal);
PayRoutes.get('/success', paypal.success);

PayRoutes.get('/cancel', paypal.cancel  );
export default PayRoutes;
