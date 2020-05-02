/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

import AppError from '../errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  /**
   * execute
   */
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const dateHour = startOfHour(date);

    const alreadyHasDate = await appointmentsRepository.findByDate(dateHour);

    if (alreadyHasDate) throw new AppError('this hour already has booked', 401);

    const appointment = appointmentsRepository.create({
      provider_id,
      date: dateHour,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
