import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ClientTable from './ClientTable.js';
import ClientCalendar from './ClientCalendar.js';
import backgroundImage from './images/background.jpg';



const generateRandomClient = () => {
  const randomName = () => {
    const names = ['John', 'Alice', 'Bob', 'Eva', 'Charlie'];
    return names[Math.floor(Math.random() * names.length)];
  };

  const randomLocation = () => {
    const locations = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const randomAppointments = () => {
    const numAppointments = Math.floor(Math.random() * 3) + 1; 
    const appointments = [];
    for (let i = 0; i < numAppointments; i++) {
      const randomDate = new Date(new Date().getTime() + Math.random() * (365 * 24 * 60 * 60 * 1000));
      appointments.push(randomDate);
    }
    return appointments;
  };

  return {
    id: Math.floor(Math.random() * 1000),
    firstName: randomName(),
    lastName: 'Doe',
    location: randomLocation(),
    appointments: randomAppointments(),
  };
};


const styles = `
  body {
    background-image: url('${backgroundImage}');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin: 0;
    padding: 0;
    height: 100vh;
    font-family: 'Arial', sans-serif; /* Add a suitable font family */
  }

  .table-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .client-table {
    width: 80%;
    border-collapse: collapse;
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 15px;
    text-align: left;
  }

  th {
    background-color: #41007F;
    color: #fff;
  }

  button {
    background-color: #41007F;
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 5px;
  }
`;


const StyleComponent = () => <style>{styles}</style>;


const App = () => {

  const [randomClients, setRandomClients] = useState(Array.from({ length: 5 }, () => generateRandomClient()));

 const handleEditClient = (clientId, editedClient) => {
   setRandomClients((prevClients) =>
      prevClients.map((client) => (client.id === clientId ? editedClient : client))
    );
 };
 const handleEditClientDetails = (clientId, updatedDetails) => {
  handleEditClient(clientId, updatedDetails);
};
 return (
   <div>
      <StyleComponent />
     <ClientTable clients={randomClients} onEditClient={handleEditClient} />

     <ClientCalendar clients={randomClients} />

   </div>
 );
};

export default App;
