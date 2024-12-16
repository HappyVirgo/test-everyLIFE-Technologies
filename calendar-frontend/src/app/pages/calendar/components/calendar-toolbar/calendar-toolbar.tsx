import { EltEvent } from '../../../../common/types';
import { useContext, useState } from 'react';
import { ToolbarStyle } from './styles/calendar-toolbar-style';
import Modal from '../Modal/modal';
import useModal from '../../hooks/use-modal';
import moment from 'moment';
import { WrapContext } from '../../calendar.page';

interface ICalendarToolbarProps {
  addEvent: (event: Omit<EltEvent, 'id'>) => Promise<void>;
  updateEvent: (event: EltEvent) => Promise<void>;
}

const formatDateForInput = (date: string): string => {
  const dateFormat = new Date(date)
  const year = dateFormat.getFullYear();
  const month = String(dateFormat.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
  const day = String(dateFormat.getDate()).padStart(2, '0');
  const hours = String(dateFormat.getHours()).padStart(2, '0');
  const minutes = String(dateFormat.getMinutes()).padStart(2, '0');

  // Return in the format: YYYY-MM-DDTHH:mm
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const CalendarToolbar = ({
  addEvent,
  updateEvent,
}: ICalendarToolbarProps) => {
  const wrapContext = useContext(WrapContext)
  const { openModal, isOpen, closeModal } = useModal();
  const [name, setName] = useState<string>(wrapContext?.selectedEvent?.title || '');
  const [startTime, setStartTime] = useState<string>(wrapContext?.selectedEvent?.start?.toString() || "");
  const [endTime, setEndTime] = useState<string>(wrapContext?.selectedEvent?.end?.toString() || "");
  const [isEdit, setIsEdit] = useState<Boolean>(false)

  const createEvent = () => {
    setName('');
    setStartTime('');
    setEndTime('');
    setIsEdit(false)
    openModal();
  }

  const editEvent = () => {
    setName(wrapContext?.selectedEvent?.title || "");
    setStartTime(wrapContext?.selectedEvent?.start?.toString() || "");
    setEndTime(wrapContext?.selectedEvent?.end?.toString() || "");
    setIsEdit(true)
    openModal();
  }

  const saveEvent = () => {
    if (isEdit && wrapContext?.selectedEvent) {
      updateEvent({ id: wrapContext?.selectedEvent.id, title: name, start: moment(startTime).toDate(), end: moment(endTime).toDate() })
    } else {
      addEvent({ title: name, start: moment(startTime).toDate(), end: moment(endTime).toDate() })
    }
    closeModal();
  }

  return (
    <div css={ToolbarStyle}>
      <button data-testid="add-event-btn" onClick={createEvent}>
        Add event
      </button>
      <button
        data-testid="edit-event-btn"
        onClick={editEvent}
        disabled={!wrapContext?.selectedEvent}
      >
        Edit event
      </button>
      <label htmlFor="show-ids-checkbox">
        <input
          id="show-ids-checkbox"
          type="checkbox"
          defaultChecked={wrapContext?.showIds}
          onClick={(e) => wrapContext?.setShowIds(e.currentTarget.checked)}
        ></input>
        Show ids
      </label>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2>Event Modal</h2>
        <p>Please input your event info!</p>
        <div>
          <div>
            <label htmlFor='event-name'>Event Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type='text' id='event-name' />
          </div>
          <div>
            <label htmlFor='event-start'>Start</label>
            <input
              onChange={(e) => setStartTime(e.target.value)}
              value={formatDateForInput(startTime)}
              type='datetime-local'
              id='event-start'
            />
          </div>
          <div>
            <label htmlFor='event-end'>End</label>
            <input
              onChange={(e) => setEndTime(e.target.value)}
              value={formatDateForInput(endTime)}
              type='datetime-local'
              id='event-end'
            />
          </div>
        </div>
        <button onClick={saveEvent}>{`${isEdit ? "Edit" : "Create"} an event`}</button>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};
