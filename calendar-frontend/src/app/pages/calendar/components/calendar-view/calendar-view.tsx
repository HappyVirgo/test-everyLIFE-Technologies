import { Calendar, momentLocalizer, stringOrDate, View } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import './styles/calendar.scss';
import { EltEvent } from '../../../../common/types';
import { CalendarFormats } from './formats';
import { useCalendarView } from '../../hooks/use-calendar-view';
import { WrapContext } from '../../calendar.page';
import { useContext } from 'react';
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<EltEvent>(Calendar);

interface ICalendarViewProps {
  onNavigate: (date: Date, view: View) => void;
  events: EltEvent[];
  // showIds: boolean;
  // setSelectedEvent: (event: EltEvent) => void;
  updateEvent: (event: EltEvent) => Promise<void>;
}

export const CalendarView = ({
  onNavigate,
  events,
  // showIds,
  // setSelectedEvent,
  updateEvent,
}: ICalendarViewProps) => {
  const wrapContext = useContext(WrapContext)
  const { components } = useCalendarView(wrapContext?.showIds || false);

  const onEventChange = ({
    event,
    start,
    end,
    isAllDay,
  }: {
    event: EltEvent;
    start: stringOrDate;
    end: stringOrDate;
    isAllDay?: boolean;  // Make isAllDay optional here
  }) => {
    const newStart = typeof start === 'string' ? new Date(start) : start;
    const newEnd = typeof end === 'string' ? new Date(end) : end;
  
    // Ensure that isAllDay is set to a boolean value, defaulting to false if undefined
    const updatedEvent: EltEvent = {
      ...event,
      start: newStart,
      end: newEnd,
      allDay: isAllDay ?? false,  // If isAllDay is undefined, default to false
    };
    
    updateEvent(updatedEvent);
  };

  return (
    <DnDCalendar
      components={components}
      defaultDate={moment().toDate()}
      events={events}
      onNavigate={onNavigate}
      defaultView={'week'}
      onSelectEvent={wrapContext?.setSelectedEvent}
      localizer={localizer}
      formats={CalendarFormats}
      onEventDrop={onEventChange}
      onEventResize={onEventChange}
      resizable
      style={{ height: '80vh' }}
      popup={true}
      dayLayoutAlgorithm={'no-overlap'}
    />
  );
};
