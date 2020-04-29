import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }

  /**
   * execute
   */
  public execute({ date, provider }: RequestDTO): Appointment {
    const dateHour = startOfHour(date);

    const alreadyHasDate = this.appointmentsRepository.findByDate(dateHour);

    if (alreadyHasDate) throw Error('this hour already has booked');

    const appointment = this.appointmentsRepository.create({
      provider,
      date: dateHour,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
