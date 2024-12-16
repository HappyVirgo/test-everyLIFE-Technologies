import { ApiService } from './api.service';
import { AxiosResponse } from 'axios';
import { Moment } from 'moment';
import { ICalendarEvent } from './types';

export class CalendarService extends ApiService {
  async getEventsForRange(
    start: Moment,
    end: Moment,
  ): Promise<AxiosResponse<ICalendarEvent[]>> {
    return this._axios.get('/api/calendar/date-range', {
      params: { start: start.toISOString(), end: end.toISOString() },
    });
  }

  async createEvent(
    name: string,
    start: Moment,
    end: Moment,
  ): Promise<AxiosResponse<{ message: string; id: number }>> {
    return this._axios.post('/api/calendar/create-event', {
      name,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  }

  async updateEvent(
    id: number,
    title: string,
    start: Moment,
    end: Moment
  ): Promise<AxiosResponse<{ message: string; updated_id: number }>> {
    return this._axios.put(`/api/calendar/update-event/${id}`, {
      name: title,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  }
}
