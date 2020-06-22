import { Router } from 'express';
import tracks from '../controllers/track';
import track from '../middleware/track';

const trackRoutes = Router();

// create a user
trackRoutes.post('/track/create', track.validateTrack, tracks.create);
trackRoutes.post('/track/read', tracks.read);

export default trackRoutes;
