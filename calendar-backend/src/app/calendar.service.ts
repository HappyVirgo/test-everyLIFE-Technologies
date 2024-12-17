import { BadRequestException, Injectable } from '@nestjs/common';
import { CalendarEventRepository } from '@fs-tech-test/calendar-domain';
import { wrap } from '@mikro-orm/mysql';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarEventRepository: CalendarEventRepository,
  ) {}

  async getEvents(start: string, end: string) {
    if (!start || !end) throw new BadRequestException('No start/end specified');

    return this.calendarEventRepository.findForRange(
      new Date(start),
      new Date(end),
    );
  }

  async addEvent(payload: EventPayload) {
    if ((await this.getEvents(payload.start, payload.end)).length > 0) throw new BadRequestException('Date conflicts!');
    const newEntity = await this.calendarEventRepository.createNewEvent(
      payload.name,
      new Date(payload.start),
      new Date(payload.end),
    );

    return newEntity.id;
  }

  async updateEvent(id: number, payload: EventPayload) {
    let existEvents = await this.getEvents(payload.start, payload.end);
    if (existEvents.filter(e => e.id != id).length > 0) throw new BadRequestException('Date conflicts!');
    const updatedEntity = await this.calendarEventRepository.updateEvent(
      id,
      payload.name,
      new Date(payload.start),
      new Date(payload.end),
    );

    return updatedEntity.id;
  }

  async deleteEvent(id: number) {
    await this.calendarEventRepository.deleteById(id);
  }
}
