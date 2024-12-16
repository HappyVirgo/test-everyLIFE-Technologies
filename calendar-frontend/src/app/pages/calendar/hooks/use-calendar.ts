import { useEffect, useState } from 'react';
import moment, { unitOfTime, Moment } from 'moment/moment';
import { View } from 'react-big-calendar';
import { EltEvent, ErrorMessage } from '../../../common/types';
import { CalendarService } from '../../../service/calendar.service';
import { AxiosError } from 'axios';

export const useCalendar = () => {
  const calendarService = new CalendarService();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [events, setEvents] = useState<EltEvent[]>([]);
  const [showIds, setShowIds] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EltEvent | undefined>();

  useEffect(() => {
    const today = moment();
    fetchEvents(today.startOf('week'), today.clone().endOf('week'));
  }, []);

  const fetchEvents = async (start: Moment, end: Moment) => {
    setLoading(true)
    const { data } = await calendarService.getEventsForRange(start, end);
    setLoading(false)
    const processedEvents: EltEvent[] = data.map((e) => ({
      id: e.id,
      title: e.name,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    setEvents(processedEvents);
  };

  const onNavigate = async (newDate: Date, view: View) => {
    const newMutableDate = moment(newDate);
    const unitOfTime = viewToUnitOfTime(view);
    await fetchEvents(
      newMutableDate.startOf(unitOfTime),
      newMutableDate.clone().endOf(unitOfTime),
    );
  };

  const addEvent = async (event: Omit<EltEvent, 'id'>) => {
    setLoading(true)
    const {
      data: { id },
    } = await calendarService.createEvent(
      event.title,
      moment(event.start),
      moment(event.end),
    );
    setLoading(false)
    setEvents((events) => [...events, { ...event, id }]);
  };

  const updateEvent = async (event: EltEvent) => {
    try {
      setLoading(true)
      const {
        data,
      } = await calendarService.updateEvent(
        event.id,
        event.title,
        moment(event.start),
        moment(event.end),
      );
      setEvents((events) => [...events.filter(event => event.id !== data.updated_id), { ...event, id: data.updated_id }]);
    } catch (error) {
      setError(((error as AxiosError).response?.data as ErrorMessage).message)
    }
    setLoading(false)
  };

  const viewToUnitOfTime = (view: View): unitOfTime.StartOf => {
    switch (view) {
      case 'day':
      case 'week':
      case 'month':
        return view;
      case 'agenda':
        return 'month';
      default:
        return 'week';
    }
  };

  return {
    events,
    loading,
    setLoading,
    error,
    setError,
    showIds,
    setShowIds,
    onNavigate,
    addEvent,
    updateEvent,
    selectedEvent,
    setSelectedEvent,
  };
};
