import { Router } from 'express';

import verifyAuth from '@modules/users/infra/http/middlewares/verifyAuth';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(verifyAuth);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
