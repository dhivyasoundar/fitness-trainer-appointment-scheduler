import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ClientDetails = ({ client, isOpen, onClose, onEditAppointment, onEditClientDetails }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAppointments, setEditedAppointments] = useState(client.appointments);
  const [editedClient, setEditedClient] = useState({ ...client });


  const handleEditAppointment = (index, newDate) => {
    // Update the selected appointment
    console.log(client.id, index, newDate)
    const updatedAppointments = [...client.appointments];
    updatedAppointments[index] = newDate;
    setEditedAppointments(updatedAppointments);
    onEditAppointment(client.id, updatedAppointments);
    console.log('Editing appointments for client:', client.id);
    console.log('Edited Appointments:', updatedAppointments);
  };

  const handleSaveChanges = () => {
    // Perform the save changes logic here  
    // Example: Update the edited appointments for the client
    onEditClientDetails(client.id, editedClient); // Update other details
    
    onEditAppointment(client.id,editedAppointments);

    // Close the edit modal
    onClose();
    console.log(`Edit button clicked for clientdetails ${client.id}`);

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClient((prevClient) => ({ ...prevClient, [name]: value }));
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Client Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" className="form-control" name="firstName" value={editedClient.firstName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" className="form-control" name="lastName" value={editedClient.lastName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input type="text" className="form-control" name="location" value={editedClient.location} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Appointments:</label>
            <ul>
              {client.appointments.map((appointment, index) => (
                <li key={index}>
                  <DatePicker
                    selected={appointment != null ? new Date(appointment) : null}
                    onChange={(date) => handleEditAppointment(index, date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                    placeholderText="Select an appointment"
                    isClearable
                    timeInputLabel="Time:"
                  />
                </li>
              ))}
            </ul>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientDetails;
