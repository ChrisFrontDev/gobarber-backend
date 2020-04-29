import { Router } from 'express';
import { parseISO, isEqual, startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);

  const dateHour = startOfHour(parsedDate);

  const alreadyHasDate = appointments.find(appointment =>
    isEqual(appointment.date, dateHour),
  );

  if (alreadyHasDate)
    return response
      .status(400)
      .json({ message: 'this hour already has booked' });

  const appointment = new Appointment(provider, dateHour);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
