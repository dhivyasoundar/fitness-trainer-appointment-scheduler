import React, { useState } from 'react';
import ClientDetails from './ClientDetails.js'
import AddAppointmentModal from './AddAppointmentModal.js';
import { deleteAppointment } from './DeleteAppointmentModal.js';
import { Modal, Button } from 'react-bootstrap';
import AddEditForm from './AddClientDetails.js';


const ClientTable = ({ clients: initialClients, onEditClient}) => {
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [isClientDetailsOpen, setClientDetailsOpen] = useState(false);
    const [isAddAppointmentModalOpen, setAddAppointmentModalOpen] = useState(false);
    const [isDeleteAppointmentModalOpen, setDeleteAppointmentModalOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false); 
    const [clients, setClients] = useState(initialClients);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isAddEditFormOpen, setAddEditFormOpen] = useState(false);
    const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null);
    const [selectedClientAppointments, setSelectedClientAppointments] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

 
    const handleAddAppointmentClick = (clientId) => {
      setSelectedClientId(clientId);
      console.log(`Adding appointment for client ${clientId}`);
      setAddAppointmentModalOpen(true);
      console.log(`AddappointmentModal ${isAddAppointmentModalOpen}`);
    };

    const handleDeleteAppointmentClick = (clientId) => {
      const selectedClient = clients.find((client) => client.id === clientId);
      const appointments = selectedClient ? selectedClient.appointments : [];
      setSelectedClientId(clientId);
      setSelectedClientAppointments(appointments);
      setShowDeleteModal(true);
    };
  
    const handleDeleteAppointment = (appointmentIndex) => {
      const updatedClients = deleteAppointment(clients, selectedClientId, appointmentIndex);
      setClients(updatedClients);
  
      setShowDeleteModal(false);
    };
  
    const handleCloseDeleteModal = () => {
      setShowDeleteModal(false);
    };
    
      const cancelDeleteAppointment = () => {
        setShowConfirmation(false);
      };

    const handleAddAppointmentModalClose = () => {
      setAddAppointmentModalOpen(false);
    };
  
    const handleAddAppointment = (selectedDate) => {
        const updatedClients = clients.map((client) => {
          if (client.id === selectedClientId) {
            return {
              ...client,
              appointments: [...client.appointments, selectedDate],
            };
          }
          return client;
        });
    
        
        setClients(updatedClients);
    
        setAddAppointmentModalOpen(false);
      };
    const handleEditButtonClick = (clientId) => {
        console.log(`Edit button clicked for clientInit ${clientId}`);
        setSelectedClientId(clientId);
        setClientDetailsOpen(true);
      };

      const handleDeleteButtonClick = (clientId) => {
        const updatedClients = clients.filter((client) => client.id !== clientId);
        setClients(updatedClients);
      };

      const handleAddButtonClick = () => {
        setAddEditFormOpen(true);
      };
    
      const handleFormSubmit = (formData) => {
        const newClient = {
          id: Math.floor(Math.random() * 1000),
          ...formData,
        };
        setClients((prevClients) => [...prevClients, newClient]);
      };
    
      const handleFormClose = () => {
        setAddEditFormOpen(false);
      };
      const handleEditAppointment = (clientId, editedAppointments) => {
        console.log('onEditAppointment, ', clientId, editedAppointments)
        const updatedClients = clients.map((client) => {
          if (client.id === clientId) {
            return { ...client, appointments: editedAppointments };
          }
          return client;
        });
        console.log(`Edit button clicked for clientTable ${clientId}`);

        setClients(updatedClients);
        onEditClient(clientId, { ...clients.find((client) => client.id === clientId), appointments: editedAppointments });

      };

    return (
        <div>
          
          <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height: '8vh',backgroundColor: '#41007F', color: '#fff' }}><b>Fitness Trainer Appointment Scheduling</b></h1>
          <title> Fitness Trainer Appointment Scheduling</title>
      <div className="table-container">
        
        <table className="client-table">
          <thead style={{ backgroundColor: '#41007F', color: '#fff' }}>
           <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Appointments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client,index) => (
              <tr key={client.id}>
                <td>{`${client.firstName} ${client.lastName}`}</td>
                <td>{client.location}</td>
                <td>
                  <ul>
                    {client.appointments.map((appointment, index) => (
                      <li key={index}>{new Date(appointment).toString()}</li>
                    ))}
                  </ul>
                  <button onClick={() => handleAddAppointmentClick(client.id)}>Add Appointment</button>
              
                  <button onClick={() => handleDeleteAppointmentClick(client.id)}>Delete Appointment</button>
                </td>
                <td>
                <button onClick={() => handleEditButtonClick(client.id)}>Edit</button>
                <button onClick={() => handleDeleteButtonClick(client.id)}>Delete</button>
              </td>
            
              </tr>
               
              
            ))}
                {selectedClientId && (
                    <ClientDetails
                    client={clients.find((client) => client.id === selectedClientId)}
                    onClose={() => setClientDetailsOpen(false)}
                    onEditAppointment={handleEditAppointment}
                    isOpen={isClientDetailsOpen}
                    onEditClientDetails={onEditClient}
                  />
                )}

                { isAddAppointmentModalOpen && (
                <AddAppointmentModal
                isOpen={isAddAppointmentModalOpen}
                onClose={handleAddAppointmentModalClose}
                onAddAppointment={handleAddAppointment}
                />
                )}
                {}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Appointments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete appointments for this client?</p>
          <ul>
            {selectedClientAppointments.map((appointment, index) => (
              <li key={index}>
                {new Date(appointment).toLocaleString()}{' '}
                <button onClick={() => handleDeleteAppointment(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
         
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height: '8vh' }}>
         <Button onClick={handleAddButtonClick}style={{ backgroundColor: '#41007F', color: '#fff' }}>Add Clients</Button>
            <AddEditForm isOpen={isAddEditFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />
      </div>
      </div>
              
    );
  };

  export default ClientTable;