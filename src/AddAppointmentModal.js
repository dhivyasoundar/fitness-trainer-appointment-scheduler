import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Modal, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

const AddAppointmentModal = ({ isOpen , onClose, onAddAppointment }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddAppointment = () => {
    onAddAppointment(selectedDate);
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select date and time for the new appointment.</p>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}  
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="form-control"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddAppointment}>
          Add Appointment
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
};

export default AddAppointmentModal;
