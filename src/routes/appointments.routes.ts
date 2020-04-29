import { Router } from 'express';
import { uuid } from 'uuidv4';
import { parseISO, isEqual, startOfHour } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

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

  const appointment = {
    id: uuid(),
    provider,
    date: dateHour,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
