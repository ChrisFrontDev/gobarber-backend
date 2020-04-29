import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

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
  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}
export default AppointmentRepository;
