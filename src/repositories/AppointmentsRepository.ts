import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /**
   * findByDate
   */
  public findByDate(date: Date): Appointment | null {
    const findDate = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findDate || null;
  }

  /**
   * create
   */
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}
export default AppointmentRepository;
