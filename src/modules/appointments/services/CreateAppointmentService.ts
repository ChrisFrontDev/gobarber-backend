/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  /**
   * execute
   */
  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const dateHour = startOfHour(date);

    const alreadyHasDate = await this.appointmentsRepository.findByDate(
      dateHour,
    );

    if (alreadyHasDate) throw new AppError('this hour already has booked', 401);

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: dateHour,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
