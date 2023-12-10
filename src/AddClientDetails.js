import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddEditForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    appointments: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleClearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      location: '',
      appointments: [],
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleInputChange} />
          </div>
          {}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleFormSubmit}>
          OK
        </Button>
        <Button variant="secondary" onClick={handleClearForm}>
          Clear
        </Button>
        <Button variant="danger" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditForm;
