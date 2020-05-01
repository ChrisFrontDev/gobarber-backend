import { Router } from 'express';
import AuthUserService from '../services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authUser = new AuthUserService();

    const { user } = await authUser.execute({ email, password });

    delete user.password;

    return response.json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;