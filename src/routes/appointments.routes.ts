import { Router } from 'express';
import { parseISO, startOfHour } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const dateHour = startOfHour(parsedDate);

  const alreadyHasDate = appointmentRepository.findByDate(dateHour);

  if (alreadyHasDate)
    return response
      .status(400)
      .json({ message: 'this hour already has booked' });

  const appointment = appointmentRepository.create({
    provider,
    date: dateHour,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
