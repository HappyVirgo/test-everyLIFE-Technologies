import { Event } from 'react-big-calendar';

export interface EltEvent extends Event {
  title: string;
  id: number;
}

export interface ErrorMessage {
  error: string;
  message: string;
  statusCode: number;
}
