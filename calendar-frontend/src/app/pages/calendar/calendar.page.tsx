import { CalendarView } from './components/calendar-view/calendar-view';
import { CalendarToolbar } from './components/calendar-toolbar/calendar-toolbar';
import { useCalendar } from './hooks/use-calendar';
import { createContext, Dispatch, useEffect, useState } from 'react';
import { EltEvent } from '../../common/types';
import Spinner from './components/spinner/spinner';
import ErrorToast from './components/error-toast/error-toast';

interface WrapContextType {
  showIds: boolean;
  setShowIds: Dispatch<boolean>;
  loading: boolean;
  setLoading: Dispatch<boolean>;
  error: string;
  selectedEvent: EltEvent | undefined;
  setSelectedEvent: (event: EltEvent) => void;
}

export const WrapContext = createContext<WrapContextType | undefined>(undefined)

export const CalendarPage = () => {
  const {
    events,
    addEvent,
    updateEvent,
    onNavigate,
    showIds,
    setShowIds,
    selectedEvent,
    setSelectedEvent,
    loading,
    setLoading,
    error,
    setError
  } = useCalendar();

  const [showToast, setShowToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(error);

   useEffect(() => {
    if (!!error) {
      setMessage(error);
      setShowToast(true);
    }
  }, [error]);

  const handleCloseToast = () => {
    setError('')
    setShowToast(false);
  };

  return (
    <WrapContext.Provider value={{showIds, setShowIds, selectedEvent, setSelectedEvent, loading, setLoading, error}}>
      <CalendarToolbar
        addEvent={addEvent}
        updateEvent={updateEvent}
      />
      <CalendarView
        onNavigate={onNavigate}
        events={events}
        updateEvent={updateEvent}
      />
      {loading ? <Spinner /> : ''}
      <ErrorToast message={message} showToast={showToast} onClose={handleCloseToast} />
    </WrapContext.Provider>
  );
};
