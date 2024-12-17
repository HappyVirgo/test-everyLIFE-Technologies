import { CalendarEventEntity } from '../entity/calendar-event.entity';
import { EntityRepository, wrap } from '@mikro-orm/mysql';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CalendarEventRepository extends EntityRepository<CalendarEventEntity> {
  async findForRange(start: Date, end: Date): Promise<CalendarEventEntity[]> {
    // By default, mikro-orm uses Knex query syntax but you can use raw queries like this if it's easier:
    // const rawResult = await this.em.getKnex().raw<CalendarEventEntity[][]>('select * from elt_event where start <= ? AND end >= ?', [end, start])
    // return rawResult[0];
    return this.find({ start: { $lte: end }, end: { $gte: start } });
  }

  async createNewEvent(
    name: string,
    start: Date,
    end: Date,
  ): Promise<CalendarEventEntity> {
    const conflictingEvent = await this.findForRange(start, end)
    if (conflictingEvent) {
      throw new BadRequestException('Date conflicts!');
    }
    const newEntity = this.create({ name, start, end });
    await this.insert(newEntity);

    return newEntity;
  }

  async updateEvent(
    id: number,
    name: string,
    start: Date,
    end: Date
  ): Promise<CalendarEventEntity> {
    // Step 1: Fetch the event being updated
    const updatedEntity = await this.findOneOrFail(id);
  
    // Step 2: Check for date range conflicts with other events
    const conflictingEvent = await this.findOne(
      {
        // id: { $ne: id }, // Exclude the event being updated from the conflict check
        start: { $lte: end }, // Check if any event starts before the new end date
        end: { $gte: start }, // Check if any event ends after the new start date
      }
    );
  
    // Step 3: If a conflicting event exists, throw an error or handle as needed
    if (conflictingEvent) {
      throw new BadRequestException('Date conflicts!');
    }
  
    // Step 4: If no conflict, proceed with the update
    wrap(updatedEntity).assign({ name, start, end });
    await this.em.flush();
  
    return updatedEntity;
  }

  async deleteById(id: number): Promise < void> {
  await this.nativeDelete({ id });
}
}
