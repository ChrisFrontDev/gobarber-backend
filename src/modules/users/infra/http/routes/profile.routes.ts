import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import verifyAuth from '../middlewares/verifyAuth';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(verifyAuth);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
