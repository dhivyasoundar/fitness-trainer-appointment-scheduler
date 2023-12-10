import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const ClientCalendar = ({ clients }) => {
    const events = clients.flatMap((client) =>
      client.appointments.map((appointmentDate) => ({
        id: client.id,
        title: `${client.firstName} ${client.lastName}`,
        start: new Date(appointmentDate),
        end: new Date(appointmentDate), 
      }))
    );
    const calendarStyle = {
        background: '#fff', 
        height: '500px', 
        overflow: 'auto'
      };
  return (
    <div style={calendarStyle} >
        <h1>Appointments</h1>
      <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
    </div>
  );
};

export default ClientCalendar;
